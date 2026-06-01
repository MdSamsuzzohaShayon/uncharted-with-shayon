<!-- components/EditorJsRenderer.vue -->
<template>
    <div class="editorjs-readonly-wrapper">
        <!-- Skeleton Loader -->
        <ArticleLoader v-if="isLoading" />
        
        <!-- Editor Container (hidden until ready) -->
        <div 
            :id="editorId" 
            class="editorjs-readonly" 
            :class="{ 'editorjs-ready': !isLoading }"
            v-show="!isLoading"
        ></div>
    </div>
</template>

<script setup lang="ts">
import type { OutputData, EditorConfig } from '@editorjs/editorjs'

interface Props {
    content: string | OutputData
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    className: ''
})

const editorId = ref(`editorjs-readonly-${Math.random().toString(36).substr(2, 9)}`)
let editorInstance: any = null
const isLoading = ref(true)

// Pre-compute theme styles as a static string (only once)
const getThemeStyles = (id: string) => `
    #${id} {
        background-color: #ffffff !important;
        color: #1a1a1a !important;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        border: none !important;
        padding: 0 !important;
    }
    #${id} .ce-toolbar,
    #${id} .ce-toolbar__plus,
    #${id} .ce-toolbar__settings-btn,
    #${id} .ce-toolbar__actions,
    #${id} .ce-popover,
    #${id} .ce-inline-toolbar,
    #${id} .ce-conversion-toolbar {
        display: none !important;
    }
    #${id} .ce-block { margin: 0.5em 0; }
    #${id} .ce-block:first-of-type { margin-top: 0; }
    #${id} .ce-block__content {
        background: transparent;
        border-radius: 6px;
        max-width: 100% !important;
        padding: 0 8px;
        margin: 0 !important;
    }
    #${id} .codex-editor__redactor {
        padding-bottom: 0 !important;
        margin-right: 0 !important;
    }
    #${id} .ce-paragraph {
        line-height: 1.6;
        font-size: 16px;
        color: #1a1a1a !important;
    }
    #${id} h1.ce-header { font-size: 2.5em; font-weight: 700; }
    #${id} h2.ce-header { font-size: 2em; font-weight: 600; }
    #${id} h3.ce-header { font-size: 1.5em; font-weight: 600; }
    #${id} h4.ce-header { font-size: 1.25em; font-weight: 600; }
    #${id} .cdx-quote {
        border-left: 4px solid #4945ff !important;
        padding-left: 20px;
        margin: 16px 0;
    }
    #${id} .ce-code__textarea {
        background: #f6f6f9 !important;
        color: #1a1a1a !important;
        border: 1px solid #eaeaef !important;
        border-radius: 6px !important;
        font-family: 'Monaco', monospace;
        font-size: 14px;
        line-height: 1.5;
        padding: 12px;
    }
    #${id} .tc-cell {
        border-color: #eaeaef !important;
        color: #1a1a1a !important;
    }
    #${id} .cdx-warning {
        background: #fff3cd !important;
        border: 1px solid #ffeaa7 !important;
        border-radius: 8px;
        padding: 16px;
        margin: 16px 0;
    }
    #${id} .image-tool__image { border-radius: 6px; }
    #${id} .image-tool__caption { color: #4a4a4a; }
    #${id} .cdx-marker {
        background: rgba(245, 235, 111, 0.4) !important;
        padding: 2px 4px;
        border-radius: 3px;
    }
    #${id} .inline-code {
        background: #eaeaef !important;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', monospace;
        font-size: 0.9em;
    }
    #${id} .cdx-checklist__item-checkbox {
        border: 2px solid #d0d0d5 !important;
        border-radius: 4px !important;
    }
    #${id} .cdx-checklist__item--checked .cdx-checklist__item-text {
        text-decoration: line-through;
        color: #6a6a6a !important;
    }
    #${id} a {
        color: #4945ff !important;
        text-decoration: none;
    }
    #${id} a:hover {
        color: #3b38d6 !important;
        text-decoration: underline;
    }
`

// Parse content safely
const parseContent = (content: string | OutputData): OutputData => {
    if (!content) {
        return { time: Date.now(), blocks: [], version: '2.30.8' }
    }

    try {
        if (typeof content === 'object' && content !== null && 'blocks' in content) {
            return content as OutputData
        }

        if (typeof content === 'string') {
            const parsed = JSON.parse(content)
            if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
                return parsed as OutputData
            }
            return {
                time: Date.now(),
                blocks: [{ type: 'paragraph', data: { text: content } }],
                version: '2.30.8'
            }
        }

        return {
            time: Date.now(),
            blocks: [{ type: 'paragraph', data: { text: String(content) } }],
            version: '2.30.8'
        }
    } catch (error) {
        console.warn('Error parsing EditorJS content:', error)
        return {
            time: Date.now(),
            blocks: [{ type: 'paragraph', data: { text: String(content) } }],
            version: '2.30.8'
        }
    }
}

// Inject CSS once immediately (before editor loads)
const injectStyles = () => {
    const styleId = `editorjs-theme-${editorId.value}`
    if (document.getElementById(styleId)) return
    
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = getThemeStyles(editorId.value)
    document.head.appendChild(style)
}

// Initialize editor with lazy-loaded tools
const initEditor = async () => {
    isLoading.value = true
    
    // Inject styles immediately (before editor loads)
    injectStyles()
    
    // Destroy existing instance
    if (editorInstance) {
        try {
            await editorInstance.destroy()
        } catch (error) {
            console.warn('Error destroying editor:', error)
        }
        editorInstance = null
    }

    const holder = document.getElementById(editorId.value)
    if (holder) {
        holder.innerHTML = ''
    }

    // Dynamically import Editor.js and only the tools that are actually used
    const [
        { default: EditorJS },
        { default: Header },
        { default: Paragraph },
        { default: List },
        { default: Quote },
        { default: ImageTool },
        { default: CodeTool },
        { default: Table },
        { default: Warning },
        { default: Checklist },
        { default: Delimiter },
        { default: Marker },
        { default: InlineCode },
        { default: Underline },
        { default: Embed },
        { default: LinkTool },
        { default: RawTool },
        { default: AttachesTool },
        { default: NestedList }
    ] = await Promise.all([
        import('@editorjs/editorjs'),
        import('@editorjs/header'),
        import('@editorjs/paragraph'),
        import('@editorjs/list'),
        import('@editorjs/quote'),
        import('@editorjs/image'),
        import('@editorjs/code'),
        import('@editorjs/table'),
        import('@editorjs/warning'),
        import('@editorjs/checklist'),
        import('@editorjs/delimiter'),
        import('@editorjs/marker'),
        import('@editorjs/inline-code'),
        import('@editorjs/underline'),
        import('@editorjs/embed'),
        import('@editorjs/link'),
        import('@editorjs/raw'),
        import('@editorjs/attaches'),
        import('@editorjs/nested-list')
    ])

    const data = parseContent(props.content)

    const editorConfig: EditorConfig = {
        holder: editorId.value,
        readOnly: true,
        data: data,
        autofocus: false,
        defaultBlock: 'paragraph',
        
        tools: {
            header: {
                class: Header,
                inlineToolbar: false,
                config: { placeholder: '', levels: [1, 2, 3, 4, 5, 6], defaultLevel: 2 }
            },
            paragraph: {
                class: Paragraph,
                inlineToolbar: false,
                config: { placeholder: '' }
            },
            list: { class: List, inlineToolbar: false },
            nestedList: { class: NestedList, inlineToolbar: false },
            checklist: { class: Checklist, inlineToolbar: false },
            quote: {
                class: Quote,
                inlineToolbar: false,
                config: { quotePlaceholder: '', captionPlaceholder: '' }
            },
            delimiter: Delimiter,
            warning: {
                class: Warning,
                inlineToolbar: false,
                config: { titlePlaceholder: '', messagePlaceholder: '' }
            },
            image: {
                class: ImageTool,
                config: {
                    features: {
                        caption: true,
                        border: true,
                        background: true,
                        stretched: true
                    }
                }
            },
            linkTool: { class: LinkTool, config: { endpoint: '' } },
            embed: {
                class: Embed,
                config: {
                    services: {
                        youtube: true,
                        twitter: true,
                        instagram: true,
                        facebook: true,
                        vimeo: true,
                        github: true,
                        codepen: true,
                        codesandbox: true
                    }
                }
            },
            attaches: { class: AttachesTool, config: { endpoint: '', buttonText: '', errorMessage: '' } },
            table: { class: Table, inlineToolbar: false },
            code: { class: CodeTool, config: { placeholder: '' } },
            raw: { class: RawTool },
            marker: { class: Marker },
            inlineCode: { class: InlineCode },
            underline: { class: Underline }
        },
        
        onReady: () => {
            // Hide loading state and show content
            isLoading.value = false
        }
    }

    try {
        editorInstance = new EditorJS(editorConfig)
    } catch (error) {
        console.error('Error initializing EditorJS:', error)
        isLoading.value = false
    }
}

onMounted(() => {
    // Use requestIdleCallback for non-critical initialization
    const init = () => initEditor()
    
    if ('requestIdleCallback' in window) {
        requestIdleCallback(init, { timeout: 100 })
    } else {
        setTimeout(init, 0)
    }
})

onUnmounted(() => {
    if (editorInstance) {
        try {
            editorInstance.destroy()
        } catch (error) {
            console.warn('Error destroying editor:', error)
        }
        editorInstance = null
    }
})

watch(() => props.content, () => {
    initEditor()
}, { deep: true })
</script>

<style scoped>
.editorjs-readonly-wrapper {
    width: 100%;
    position: relative;
    min-height: 200px;
}

.editorjs-skeleton {
    padding: 1rem 0;
}

.editorjs-readonly {
    width: 100%;
    min-height: auto;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.editorjs-readonly.editorjs-ready {
    opacity: 1;
}
</style>