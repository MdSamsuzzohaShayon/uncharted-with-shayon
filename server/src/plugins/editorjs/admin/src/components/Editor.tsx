import React, { useEffect, useRef, forwardRef, useImperativeHandle, useMemo, useCallback } from 'react';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { useStrapiTheme } from '../hooks/useStrapiTheme';
import { useStrapiMediaLibrary } from '../hooks/useStrapiMediaLibrary';

// Official Editor.js Tools
import Header from '@editorjs/header';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Checklist from '@editorjs/checklist';
import Underline from '@editorjs/underline';
import AttachesTool from '@editorjs/attaches';
import RawTool from '@editorjs/raw';

// Third-party tools
import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';

// Custom Tools
import AlignmentTune from '../custom-tools/AlignmentTune';
import FontSizeTune from '../custom-tools/FontSizeTune';
import TextColorTune from '../custom-tools/TextColorTune';
import ChartBlock from '../custom-tools/ChartBlock';
import BackgroundColorTune from '../custom-tools/BackgroundColorTune';
import FontFamilyTune from '../custom-tools/FontFamilyTune';
import IndentTune from '../custom-tools/IndentTune';
import StrapiImageTool from '../custom-tools/StrapiImageTool';


type TComponentClass = EditorConfig['tools'] extends undefined ? never : NonNullable<EditorConfig['tools']>[string] extends { class: infer C } ? C : never;

// Types
interface EditorInputProps {
    attribute: any;
    name: string;
    value: string;
    onChange: (event: { target: { name: string; value: any; type: string } }) => void;
    disabled: boolean;
    error?: string;
    required?: boolean;
}

interface EditorTheme {
    // Background colors
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    bgHover: string;
    bgActive: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;

    // Border colors
    borderLight: string;
    borderMedium: string;
    borderStrong: string;

    // Accent colors
    accentPrimary: string;
    accentHover: string;
    accentLight: string;

    // Shadow
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
}

const EditorInput = forwardRef<any, EditorInputProps>(({
    name,
    value,
    onChange,
    disabled,
}, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const editorContainerId = useMemo(() => `editorjs-${name}-${Date.now()}`, [name]);
    const theme = useStrapiTheme();
    const isSavingRef = useRef(false);
    const isInitializedRef = useRef(false);
    const { openMediaLibrary } = useStrapiMediaLibrary();

    console.log("-----------------------------------------------------------------------");
    console.log("-----------------------------------------------------------------------");
    console.log({ theme });
    console.log("-----------------------------------------------------------------------");
    console.log("-----------------------------------------------------------------------");


    // Comprehensive theme configuration with proper contrast
    const themeConfig = useMemo<EditorTheme>(() => {
        const isDark = theme === 'dark';

        console.log({ theme, isDark }); // Debug: should show correct theme

        return {
            // Background colors
            bgPrimary: isDark ? '#1a1a1a' : '#ffffff',
            bgSecondary: isDark ? '#2d2d2d' : '#f6f6f9',
            bgTertiary: isDark ? '#3a3a3a' : '#eaeaef',
            bgHover: isDark ? '#4a4a4a' : '#e0e0e5',
            bgActive: isDark ? '#5a5a5a' : '#d0d0d5',

            // Text colors with high contrast - FIXED
            textPrimary: isDark ? '#ffffff' : '#1a1a1a',      // White text on dark, dark text on light
            textSecondary: isDark ? '#e0e0e0' : '#4a4a4a',
            textMuted: isDark ? '#a0a0a0' : '#6a6a6a',
            textInverse: isDark ? '#1a1a1a' : '#ffffff',

            // Border colors
            borderLight: isDark ? '#404040' : '#eaeaef',
            borderMedium: isDark ? '#505050' : '#d0d0d5',
            borderStrong: isDark ? '#606060' : '#a0a0a5',

            // Accent colors
            accentPrimary: '#4945ff',
            accentHover: '#3b38d6',
            accentLight: isDark ? '#2a2866' : '#eeedff',

            // Shadow properties
            shadowSm: isDark ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
            shadowMd: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            shadowLg: isDark ? '0 10px 15px rgba(0, 0, 0, 0.4)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
        };
    }, [theme]);

    useImperativeHandle(ref, () => ({
        save: async () => {
            if (editorInstance.current && isInitializedRef.current) {
                return await editorInstance.current.save();
            }
            return null;
        },
    }));

    // Save handler
    const handleSave = useCallback(async () => {
        if (!editorInstance.current || isSavingRef.current || !isInitializedRef.current) return;

        try {
            isSavingRef.current = true;
            const savedData: OutputData = await editorInstance.current.save();

            onChange({
                target: {
                    name,
                    value: JSON.stringify(savedData),
                    type: 'json',
                },
            });
        } catch (error) {
            console.error('Error saving editor data:', error);
        } finally {
            isSavingRef.current = false;
        }
    }, [name, onChange]);

    // Initialize Editor.js
    useEffect(() => {
        isInitializedRef.current = false;

        // Clean up the container completely
        const container = document.getElementById(editorContainerId);
        if (container) {
            container.innerHTML = '';
        }

        // Parse data safely - handle both string and object cases
        let parsedData;
        try {
            if (value) {
                // If value is already an object, use it directly
                if (typeof value === 'object') {
                    parsedData = value;
                } else if (typeof value === 'string') {
                    // Try to parse if it's a string
                    parsedData = JSON.parse(value);
                }
            }
        } catch (error) {
            console.warn('Failed to parse editor data:', error);
            // Use default data if parsing fails
            parsedData = null;
        }


        // Use parsed data or default
        const editorData = parsedData || {
            time: Date.now(),
            blocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'Start writing your amazing content here...'
                    }
                }
            ],
            version: '2.30.8'
        };

        const editorConfig: EditorConfig = {
            holder: editorContainerId,
            readOnly: disabled,
            autofocus: false,
            defaultBlock: 'paragraph',
            placeholder: 'Type / to see all available tools...',

            data: editorData,

            tools: {
                header: {
                    class: Header as TComponentClass,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4, 5, 6],
                        defaultLevel: 2,
                    },
                    shortcut: 'CMD+SHIFT+H',
                },
                paragraph: {
                    class: Paragraph as TComponentClass,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Write something amazing...',
                    },
                    tunes: ['alignmentTune', 'fontSizeTune', 'textColorTune', 'backgroundColorTune', 'fontFamilyTune'],
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+L',
                },
                nestedList: {
                    class: NestedList as TComponentClass,
                    inlineToolbar: true,
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+C',
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Author',
                    },
                    shortcut: 'CMD+SHIFT+Q',
                    tunes: ['alignmentTune'],
                },
                delimiter: {
                    class: Delimiter,
                    shortcut: 'CMD+SHIFT+D',
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                    config: {
                        titlePlaceholder: 'Title',
                        messagePlaceholder: 'Message',
                    },
                    shortcut: 'CMD+SHIFT+W',
                },
                // In your tools config inside useEffect:
                image: {
                    class: StrapiImageTool,
                    config: {
                        mediaLibraryOpener: openMediaLibrary,
                    },
                    tunes: ['alignmentTune'],
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/api/link/fetch',
                    },
                },
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
                            codesandbox: true,
                        },
                    },
                },
                attaches: {
                    class: AttachesTool,
                    config: {
                        endpoint: '/api/upload',
                        field: 'files',
                        types: '*/*',
                        buttonText: 'Select a file',
                        errorMessage: 'File upload failed',
                    },
                },
                table: {
                    class: Table as TComponentClass,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                        maxRows: 20,
                        maxCols: 10,
                    },
                },
                code: {
                    class: CodeTool,
                    config: {
                        placeholder: 'Enter code here...',
                    },
                    shortcut: 'CMD+SHIFT+K',
                },
                raw: {
                    class: RawTool,
                },
                chart: {
                    class: ChartBlock as TComponentClass,
                    inlineToolbar: true,
                },
                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+I',
                },
                underline: {
                    class: Underline,
                    shortcut: 'CMD+U',
                },
                alignmentTune: AlignmentTune as TComponentClass,
                fontSizeTune: FontSizeTune as TComponentClass,
                textColorTune: TextColorTune as TComponentClass,
                backgroundColorTune: BackgroundColorTune as TComponentClass,
                fontFamilyTune: FontFamilyTune as TComponentClass,
                indentTune: IndentTune as TComponentClass,
            },

            inlineToolbar: ['bold', 'italic', 'underline', 'marker', 'inlineCode', 'link'],
            tunes: ['alignmentTune', 'fontSizeTune', 'textColorTune', 'backgroundColorTune', 'fontFamilyTune', 'indentTune'],

            onChange: async () => {
                if (!disabled && isInitializedRef.current) {
                    await handleSave();
                }
            },

            onReady: () => {
                console.log('Editor.js is ready!');
                isInitializedRef.current = true;

                // Apply theme immediately
                applyCustomTheme(themeConfig);

                // Apply theme again after a short delay to catch any dynamically added elements
                setTimeout(() => {
                    applyCustomTheme(themeConfig);
                }, 100);

                // Apply theme one more time after toolbar is likely rendered
                setTimeout(() => {
                    applyCustomTheme(themeConfig);
                }, 500);
            },
        };

        const editor = new EditorJS(editorConfig);

        try {
            new Undo({ editor });
            new DragDrop(editor);
        } catch (error) {
            console.warn('Failed to initialize plugins:', error);
        }

        editorInstance.current = editor;

        return () => {
            isInitializedRef.current = false;

            const container = document.getElementById(editorContainerId);
            if (container) {
                container.innerHTML = '';
            }

            editorInstance.current = null;
        };
    }, [editorContainerId, disabled]);



    // Apply comprehensive custom theme
    // Update the applyCustomTheme function to be more aggressive with specificity

    const applyCustomTheme = useCallback((config: EditorTheme) => {
        const styleId = `editorjs-custom-theme-${editorContainerId}`;
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
        /* ============ BASE CONTAINER ============ */
        #${editorContainerId} {
            background-color: ${config.bgPrimary} !important;
            color: ${config.textPrimary} !important;
            min-height: 400px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
        }

        /* ============ TOOLBAR - FIXED STYLES ============ */
        /* Main toolbar container */
        #${editorContainerId} .ce-toolbar {
            z-index: 2;
        }

        /* Plus and Settings buttons */
        #${editorContainerId} .ce-toolbar__plus,
        #${editorContainerId} .ce-toolbar__settings-btn {
            background-color: ${config.bgSecondary} !important;
            color: ${config.textPrimary} !important;
            border: 1px solid ${config.borderLight} !important;
            border-radius: 6px !important;
            width: 34px !important;
            height: 34px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
        }

        #${editorContainerId} .ce-toolbar__plus:hover,
        #${editorContainerId} .ce-toolbar__settings-btn:hover {
            background-color: ${config.bgHover} !important;
            border-color: ${config.accentPrimary} !important;
        }

        /* SVG icons in toolbar buttons - THIS IS THE KEY FIX */
        #${editorContainerId} .ce-toolbar__plus svg,
        #${editorContainerId} .ce-toolbar__settings-btn svg,
        #${editorContainerId} .ce-toolbar__actions svg,
        #${editorContainerId} .ce-toolbar svg {
            fill: ${config.textPrimary} !important;
            color: ${config.textPrimary} !important;
            stroke: ${config.textPrimary} !important;
        }

        /* Toolbar actions container */
        #${editorContainerId} .ce-toolbar__actions {
            background-color: transparent !important;
        }

        /* ============ POPOVER (Tool Menu) ============ */
        #${editorContainerId} .ce-popover {
            background: ${config.bgSecondary} !important;
            border: 1px solid ${config.borderLight} !important;
            color: ${config.textPrimary} !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        #${editorContainerId} .ce-popover__container {
            background: ${config.bgSecondary} !important;
        }

        #${editorContainerId} .ce-popover__items {
            background: ${config.bgSecondary} !important;
        }

        #${editorContainerId} .ce-popover__item {
            color: ${config.textPrimary} !important;
            background: transparent !important;
        }

        #${editorContainerId} .ce-popover__item-icon {
            background: ${config.bgTertiary} !important;
            color: ${config.textPrimary} !important;
            border-radius: 4px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        #${editorContainerId} .ce-popover__item-icon svg {
            fill: ${config.textPrimary} !important;
            color: ${config.textPrimary} !important;
        }

        #${editorContainerId} .ce-popover__item-label {
            color: ${config.textPrimary} !important;
        }

        #${editorContainerId} .ce-popover__item:hover {
            background-color: ${config.bgHover} !important;
        }

        #${editorContainerId} .ce-popover__item--active {
            background-color: ${config.accentLight} !important;
        }

        /* Popover search input */
        #${editorContainerId} .ce-popover__search input {
            background: ${config.bgPrimary} !important;
            color: ${config.textPrimary} !important;
            border: 1px solid ${config.borderLight} !important;
        }

        #${editorContainerId} .ce-popover__search input::placeholder {
            color: ${config.textMuted} !important;
        }

        /* ============ INLINE TOOLBAR ============ */
        #${editorContainerId} .ce-inline-toolbar {
            background: ${config.bgSecondary} !important;
            border: 1px solid ${config.borderLight} !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            padding: 4px !important;
        }

        #${editorContainerId} .ce-inline-toolbar__buttons {
            display: flex !important;
            gap: 2px !important;
        }

        #${editorContainerId} .ce-inline-tool {
            color: ${config.textPrimary} !important;
            background: transparent !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
            width: 34px !important;
            height: 34px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        #${editorContainerId} .ce-inline-tool svg {
            fill: ${config.textPrimary} !important;
            color: ${config.textPrimary} !important;
            stroke: ${config.textPrimary} !important;
        }

        #${editorContainerId} .ce-inline-tool:hover {
            background-color: ${config.bgHover} !important;
        }

        #${editorContainerId} .ce-inline-tool--active {
            color: ${config.accentPrimary} !important;
            background-color: ${config.accentLight} !important;
        }

        #${editorContainerId} .ce-inline-tool--active svg {
            fill: ${config.accentPrimary} !important;
            color: ${config.accentPrimary} !important;
        }

        /* ============ CONVERSION TOOLBAR ============ */
        #${editorContainerId} .ce-conversion-toolbar {
            background: ${config.bgSecondary} !important;
            border: 1px solid ${config.borderLight} !important;
            border-radius: 8px !important;
            padding: 4px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        #${editorContainerId} .ce-conversion-toolbar__buttons {
            display: flex !important;
            flex-direction: column !important;
            gap: 2px !important;
        }

        #${editorContainerId} .ce-conversion-tool {
            color: ${config.textPrimary} !important;
            background: transparent !important;
            border-radius: 4px !important;
            padding: 6px 12px !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        #${editorContainerId} .ce-conversion-tool svg {
            fill: ${config.textPrimary} !important;
            color: ${config.textPrimary} !important;
        }

        #${editorContainerId} .ce-conversion-tool:hover {
            background-color: ${config.bgHover} !important;
        }

        #${editorContainerId} .ce-conversion-tool--focused {
            background-color: ${config.accentLight} !important;
        }

        #${editorContainerId} .ce-conversion-tool__icon {
            background: ${config.bgTertiary} !important;
            border-radius: 4px !important;
            width: 32px !important;
            height: 32px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        /* ============ BLOCK TUNE BUTTON ============ */
        #${editorContainerId} .ce-toolbar__settings-btn {
            margin-left: 5px !important;
        }

        /* Tunes popover */
        #${editorContainerId} .ce-popover--tunes .ce-popover__item {
            padding: 8px 12px !important;
        }

        #${editorContainerId} .ce-popover--tunes .ce-popover__item-icon {
            width: 28px !important;
            height: 28px !important;
        }

        /* ============ REST OF YOUR EXISTING STYLES ============ */
        /* ... (keep all your other block styles, they look fine) ... */

        /* ============ BLOCKS ============ */
        #${editorContainerId} .ce-block {
            margin: 0.5em 0;
        }

        #${editorContainerId} .ce-block:first-of-type {
            margin-top: 0;
        }

        #${editorContainerId} .ce-block__content {
            background: transparent;
            border-radius: 6px;
            transition: background-color 0.2s ease;
            max-width: 100%;
            padding: 0 8px;
        }

        #${editorContainerId} .ce-block--focused .ce-block__content {
            background: ${config.bgSecondary};
        }

        #${editorContainerId} .ce-block--selected .ce-block__content {
            background: ${config.bgTertiary};
        }

        /* ============ PARAGRAPH ============ */
        #${editorContainerId} .ce-paragraph {
            line-height: 1.6;
            font-size: 16px;
            color: ${config.textPrimary} !important;
        }

        #${editorContainerId} .ce-paragraph[data-placeholder]:empty::before {
            color: ${config.textMuted};
        }

        /* ============ HEADERS ============ */
        #${editorContainerId} h1.ce-header,
        #${editorContainerId} h2.ce-header,
        #${editorContainerId} h3.ce-header,
        #${editorContainerId} h4.ce-header {
            color: ${config.textPrimary} !important;
        }

        #${editorContainerId} h1.ce-header {
            font-size: 2.5em;
            font-weight: 700;
            margin: 0.5em 0;
            line-height: 1.3;
        }

        #${editorContainerId} h2.ce-header {
            font-size: 2em;
            font-weight: 600;
            margin: 0.5em 0;
            line-height: 1.3;
        }

        #${editorContainerId} h3.ce-header {
            font-size: 1.5em;
            font-weight: 600;
            margin: 0.5em 0;
            line-height: 1.3;
        }

        #${editorContainerId} h4.ce-header {
            font-size: 1.25em;
            font-weight: 600;
            margin: 0.5em 0;
            line-height: 1.3;
        }

        /* ============ SELECTION ============ */
        #${editorContainerId} ::selection {
            background: ${config.accentLight};
            color: ${config.textPrimary};
        }

        #${editorContainerId} ::-moz-selection {
            background: ${config.accentLight};
            color: ${config.textPrimary};
        }

        /* ============ SMOOTH TRANSITIONS ============ */
        #${editorContainerId},
        #${editorContainerId} .ce-toolbar__plus,
        #${editorContainerId} .ce-toolbar__settings-btn,
        #${editorContainerId} .ce-popover,
        #${editorContainerId} .ce-inline-toolbar,
        #${editorContainerId} .ce-conversion-toolbar,
        #${editorContainerId} .ce-block__content {
            transition: background-color 0.3s ease, 
                        color 0.3s ease, 
                        border-color 0.3s ease,
                        box-shadow 0.3s ease;
        }

        #${editorContainerId} [contenteditable="true"] {
            color: ${config.textPrimary} !important;
            caret-color: ${config.accentPrimary} !important;
        }

        /* ============ PLACEHOLDER ============ */
        #${editorContainerId} [data-placeholder]:empty::before {
            color: ${config.textMuted} !important;
            font-style: italic;
            opacity: 0.7;
        }
    `;

        document.head.appendChild(style);
    }, [editorContainerId, theme]);


    // Add this useEffect to handle theme changes
    useEffect(() => {
        if (editorInstance.current && isInitializedRef.current) {
            applyCustomTheme(themeConfig);

            // Re-apply after delays to catch dynamic elements
            const timeout1 = setTimeout(() => applyCustomTheme(themeConfig), 100);
            const timeout2 = setTimeout(() => applyCustomTheme(themeConfig), 500);

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
            };
        }
    }, [themeConfig, applyCustomTheme]);
    // Handle Strapi save event
    useEffect(() => {
        const handleStrapiSave = () => {
            handleSave();
        };

        window.addEventListener('strapi:save', handleStrapiSave);
        return () => {
            window.removeEventListener('strapi:save', handleStrapiSave);
        };
    }, [handleSave]);

    return (
        <div
            id={editorContainerId}
            style={{
                border: `1px solid ${themeConfig.borderLight}`,
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: themeConfig.bgPrimary,
                color: themeConfig.textPrimary,
                minHeight: '400px',
                width: '100%',
                boxSizing: 'border-box',
                position: 'relative',
            }}
        />
    );
});

EditorInput.displayName = 'EditorInput';
export default EditorInput;