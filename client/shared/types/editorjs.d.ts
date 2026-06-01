// types/editorjs.d.ts

declare module '@editorjs/editorjs' {
    export interface ToolConstructable {
        new (config?: any): any
    }

    export interface ToolSettings {
        class: ToolConstructable
        inlineToolbar?: boolean | string[]
        config?: Record<string, any>
        shortcut?: string
        toolbox?: {
            icon?: string
            title?: string
        }
    }

    export interface Tools {
        [toolName: string]: ToolConstructable | ToolSettings
    }

    export interface EditorConfig {
        holder: string | HTMLElement
        autofocus?: boolean
        readOnly?: boolean
        data?: OutputData
        tools?: Tools
        defaultBlock?: string
        placeholder?: string | Record<string, string>
        inlineToolbar?: boolean | string[]
        tunes?: string[]
        minHeight?: number
        onChange?: (api: API, event: BlockChangedEvent) => void
        onReady?: () => void
    }

    export interface BlockChangedEvent {
        type: string
        detail: {
            target: {
                name: string
                id: string
            }
        }
    }

    export interface API {
        blocks: {
            getCurrentBlockIndex(): number
        }
        saver: {
            save(): Promise<OutputData>
        }
    }

    export interface OutputBlockData {
        id?: string
        type: string
        data: Record<string, any>
    }

    export interface OutputData {
        time?: number
        blocks: OutputBlockData[]
        version?: string
    }

    export default class EditorJS {
        constructor(config?: EditorConfig | string)
        public save(): Promise<OutputData>
        public destroy(): Promise<void>
        public clear(): Promise<void>
        public render(data: OutputData): Promise<void>
        public focus(): void
    }
}

// Declare all Editor.js block tools
declare module '@editorjs/header' {
    export default class Header {
        constructor(config?: any)
    }
}

declare module '@editorjs/list' {
    export default class List {
        constructor(config?: any)
    }
}

declare module '@editorjs/nested-list' {
    export default class NestedList {
        constructor(config?: any)
    }
}

declare module '@editorjs/paragraph' {
    export default class Paragraph {
        constructor(config?: any)
    }
}

declare module '@editorjs/quote' {
    export default class Quote {
        constructor(config?: any)
    }
}

declare module '@editorjs/image' {
    export default class ImageTool {
        constructor(config?: any)
    }
}

declare module '@editorjs/table' {
    export default class Table {
        constructor(config?: any)
    }
}

declare module '@editorjs/code' {
    export default class CodeTool {
        constructor(config?: any)
    }
}

declare module '@editorjs/link' {
    export default class LinkTool {
        constructor(config?: any)
    }
}

declare module '@editorjs/embed' {
    export default class Embed {
        constructor(config?: any)
    }
}

declare module '@editorjs/delimiter' {
    export default class Delimiter {
        constructor(config?: any)
    }
}

declare module '@editorjs/warning' {
    export default class Warning {
        constructor(config?: any)
    }
}

declare module '@editorjs/marker' {
    export default class Marker {
        constructor(config?: any)
    }
}

declare module '@editorjs/inline-code' {
    export default class InlineCode {
        constructor(config?: any)
    }
}

declare module '@editorjs/checklist' {
    export default class Checklist {
        constructor(config?: any)
    }
}

declare module '@editorjs/underline' {
    export default class Underline {
        constructor(config?: any)
    }
}

declare module '@editorjs/attaches' {
    export default class AttachesTool {
        constructor(config?: any)
    }
}

declare module '@editorjs/raw' {
    export default class RawTool {
        constructor(config?: any)
    }
}

// Declare third-party editor.js plugins
declare module 'editorjs-undo' {
    export default class Undo {
        constructor(config: { editor: any })
    }
}

declare module 'editorjs-drag-drop' {
    export default class DragDrop {
        constructor(config: { editor: any })
    }
}