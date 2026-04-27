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

        const editorConfig: EditorConfig = {
            holder: editorContainerId,
            readOnly: disabled,
            autofocus: false,
            defaultBlock: 'paragraph',
            placeholder: 'Type / to see all available tools...',

            data: value ? JSON.parse(value) : {
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
            },

            tools: {
                header: {
                    class: Header  as TComponentClass,
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
                applyCustomTheme(themeConfig);
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

            /* ============ TOOLBAR ============ */
            #${editorContainerId} .ce-toolbar__plus,
            #${editorContainerId} .ce-toolbar__settings-btn {
                background-color: ${config.bgSecondary};
                color: ${config.textPrimary};
                transition: all 0.2s ease;
                border-radius: 6px;
                border: 1px solid ${config.borderLight};
            }

            #${editorContainerId} .ce-toolbar__plus:hover,
            #${editorContainerId} .ce-toolbar__settings-btn:hover {
                background-color: ${config.bgHover};
                border-color: ${config.borderMedium};
            }

            #${editorContainerId} .ce-toolbar__plus svg,
            #${editorContainerId} .ce-toolbar__settings-btn svg {
                fill: ${config.textPrimary};
            }

            /* ============ POPOVER ============ */
            #${editorContainerId} .ce-popover {
                background: ${config.bgSecondary};
                border: 1px solid ${config.borderLight};
                color: ${config.textPrimary};
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            #${editorContainerId} .ce-popover__item-icon {
                background: ${config.bgTertiary};
                color: ${config.textPrimary};
                border-radius: 4px;
            }

            #${editorContainerId} .ce-popover__item-label {
                color: ${config.textPrimary};
            }

            #${editorContainerId} .ce-popover__item:hover {
                background-color: ${config.bgHover};
            }

            #${editorContainerId} .ce-popover__item--active {
                background-color: ${config.accentLight};
            }

            /* ============ INLINE TOOLBAR ============ */
            #${editorContainerId} .ce-inline-toolbar {
                background: ${config.bgSecondary};
                border: 1px solid ${config.borderLight};
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 4px;
            }

            #${editorContainerId} .ce-inline-tool {
                color: ${config.textPrimary};
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            #${editorContainerId} .ce-inline-tool:hover {
                background-color: ${config.bgHover};
            }

            #${editorContainerId} .ce-inline-tool--active {
                color: ${config.accentPrimary};
                background-color: ${config.accentLight};
            }

            #${editorContainerId} .ce-inline-tool svg {
                fill: ${config.textPrimary};
            }

            /* ============ CONVERSION TOOLBAR ============ */
            #${editorContainerId} .ce-conversion-toolbar {
                background: ${config.bgSecondary};
                border: 1px solid ${config.borderLight};
                border-radius: 8px;
                padding: 4px;
            }

            #${editorContainerId} .ce-conversion-tool {
                color: ${config.textPrimary};
                border-radius: 4px;
            }

            #${editorContainerId} .ce-conversion-tool:hover {
                background-color: ${config.bgHover};
            }

            #${editorContainerId} .ce-conversion-tool--focused {
                background-color: ${config.accentLight};
            }

            /* ============ TABLE ============ */
            #${editorContainerId} .tc-wrap {
                --color-background: ${config.bgPrimary};
                --color-border: ${config.borderLight};
                --color-text-primary: ${config.textPrimary};
                --color-text-secondary: ${config.textSecondary};
                --color-toolbar-bg: ${config.bgSecondary};
                --color-toolbar-button: ${config.textPrimary};
                --color-toolbar-button-hover: ${config.bgHover};
            }

            #${editorContainerId} .tc-toolbar {
                background: ${config.bgSecondary};
                border-color: ${config.borderLight};
            }

            #${editorContainerId} .tc-cell {
                border-color: ${config.borderLight};
                color: ${config.textPrimary};
            }

            #${editorContainerId} .tc-cell--selected {
                background: ${config.accentLight};
            }

            /* ============ IMAGE ============ */
            #${editorContainerId} .image-tool {
                --bg-color: ${config.bgSecondary};
                --front-color: ${config.textPrimary};
                --border-color: ${config.borderLight};
            }

            #${editorContainerId} .image-tool__image {
                border-radius: 6px;
            }

            #${editorContainerId} .image-tool__caption {
                color: ${config.textSecondary};
                border-color: ${config.borderLight};
            }

            #${editorContainerId} .image-tool__caption:focus {
                border-color: ${config.accentPrimary};
            }

            /* ============ CODE ============ */
            #${editorContainerId} .ce-code__textarea {
                background: ${config.bgSecondary};
                color: ${config.textPrimary};
                border: 1px solid ${config.borderLight};
                border-radius: 6px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 14px;
                line-height: 1.5;
                padding: 12px;
            }

            #${editorContainerId} .ce-code__textarea:focus {
                border-color: ${config.accentPrimary};
                outline: none;
            }

            /* ============ QUOTE ============ */
            #${editorContainerId} .cdx-quote {
                border-left: 4px solid ${config.accentPrimary};
                padding-left: 20px;
                margin: 16px 0;
            }

            #${editorContainerId} .cdx-quote__text {
                color: ${config.textPrimary};
                font-size: 1.1em;
                font-style: italic;
            }

            #${editorContainerId} .cdx-quote__caption {
                color: ${config.textSecondary};
            }

            /* ============ WARNING ============ */
            #${editorContainerId} .cdx-warning {
                background: ${theme === 'dark' ? '#3a2a1a' : '#fff3cd'};
                border: 1px solid ${theme === 'dark' ? '#856404' : '#ffeaa7'};
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
            }

            #${editorContainerId} .cdx-warning__title {
                color: ${theme === 'dark' ? '#ffc107' : '#856404'};
                font-weight: 600;
            }

            #${editorContainerId} .cdx-warning__message {
                color: ${theme === 'dark' ? '#ffeaa7' : '#856404'};
            }

            /* ============ CHECKLIST ============ */
            #${editorContainerId} .cdx-checklist__item {
                color: ${config.textPrimary};
            }

            #${editorContainerId} .cdx-checklist__item-checkbox {
                border: 2px solid ${config.borderMedium};
                background: ${config.bgPrimary};
                border-radius: 4px;
            }

            #${editorContainerId} .cdx-checklist__item-checkbox-check {
                background: ${config.accentPrimary};
                border-radius: 2px;
            }

            #${editorContainerId} .cdx-checklist__item--checked .cdx-checklist__item-text {
                color: ${config.textMuted};
                text-decoration: line-through;
            }

            /* ============ LINK ============ */
            #${editorContainerId} .cdx-link {
                background: ${config.bgSecondary};
                border: 1px solid ${config.borderLight};
                border-radius: 6px;
                padding: 8px 12px;
            }

            #${editorContainerId} .cdx-link__title {
                color: ${config.textPrimary};
            }

            #${editorContainerId} .cdx-link__description {
                color: ${config.textSecondary};
            }

            #${editorContainerId} .cdx-link__anchor {
                color: ${config.accentPrimary};
            }

            /* ============ EMBED ============ */
            #${editorContainerId} .embed-tool {
                background: ${config.bgSecondary};
                border: 1px solid ${config.borderLight};
                border-radius: 8px;
            }

            #${editorContainerId} .embed-tool__input {
                background: ${config.bgPrimary};
                color: ${config.textPrimary};
                border: 1px solid ${config.borderLight};
                border-radius: 6px;
                padding: 8px 12px;
            }

            #${editorContainerId} .embed-tool__input:focus {
                border-color: ${config.accentPrimary};
                outline: none;
            }

            /* ============ MARKER (HIGHLIGHT) ============ */
            #${editorContainerId} .cdx-marker {
                background: ${theme === 'dark' ? 'rgba(255, 235, 111, 0.3)' : 'rgba(245, 235, 111, 0.4)'};
                color: ${config.textPrimary};
                padding: 2px 4px;
                border-radius: 3px;
            }

            /* ============ INLINE CODE ============ */
            #${editorContainerId} .inline-code {
                background: ${config.bgTertiary};
                color: ${config.textPrimary};
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.9em;
                border: 1px solid ${config.borderLight};
            }

            /* ============ DELIMITER ============ */
            #${editorContainerId} .ce-delimiter {
                line-height: 1.6em;
                width: 100%;
                text-align: center;
            }

            #${editorContainerId} .ce-delimiter:before {
                display: inline-block;
                content: "***";
                font-size: 30px;
                line-height: 65px;
                height: 30px;
                letter-spacing: 0.2em;
                color: ${config.textMuted};
            }

            /* ============ SCROLLBAR ============ */
            #${editorContainerId} ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            #${editorContainerId} ::-webkit-scrollbar-track {
                background: ${config.bgPrimary};
            }

            #${editorContainerId} ::-webkit-scrollbar-thumb {
                background: ${config.borderMedium};
                border-radius: 4px;
            }

            #${editorContainerId} ::-webkit-scrollbar-thumb:hover {
                background: ${config.borderStrong};
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

            /* ============ RESPONSIVE DESIGN ============ */
            
            /* Tablet (768px - 1024px) */
            @media (max-width: 1024px) and (min-width: 769px) {
                #${editorContainerId} {
                    padding: 20px;
                    min-height: 400px;
                }

                #${editorContainerId} .ce-block__content {
                    padding: 0 12px;
                }

                #${editorContainerId} h1.ce-header {
                    font-size: 2.2em;
                }

                #${editorContainerId} h2.ce-header {
                    font-size: 1.8em;
                }

                #${editorContainerId} h3.ce-header {
                    font-size: 1.4em;
                }
            }

            /* Mobile (320px - 768px) */
            @media (max-width: 768px) {
                #${editorContainerId} {
                    padding: 16px;
                    min-height: 350px;
                }

                #${editorContainerId} .ce-toolbar__actions {
                    right: 5px;
                }

                #${editorContainerId} .ce-toolbar__plus,
                #${editorContainerId} .ce-toolbar__settings-btn {
                    width: 34px;
                    height: 34px;
                }

                #${editorContainerId} .ce-block__content {
                    padding: 0 8px;
                }

                #${editorContainerId} h1.ce-header {
                    font-size: 1.8em;
                }

                #${editorContainerId} h2.ce-header {
                    font-size: 1.5em;
                }

                #${editorContainerId} h3.ce-header {
                    font-size: 1.25em;
                }

                #${editorContainerId} .ce-paragraph {
                    font-size: 15px;
                }

                #${editorContainerId} .ce-popover {
                    max-width: 280px;
                }

                #${editorContainerId} .ce-inline-toolbar {
                    flex-wrap: wrap;
                    max-width: 280px;
                }

                #${editorContainerId} .image-tool__image {
                    max-height: 300px;
                }

                #${editorContainerId} .tc-toolbar {
                    flex-wrap: wrap;
                }
            }

            /* Small Mobile (< 480px) */
            @media (max-width: 480px) {
                #${editorContainerId} {
                    padding: 12px;
                    min-height: 300px;
                }

                #${editorContainerId} .ce-toolbar__plus,
                #${editorContainerId} .ce-toolbar__settings-btn {
                    width: 30px;
                    height: 30px;
                }

                #${editorContainerId} h1.ce-header {
                    font-size: 1.6em;
                }

                #${editorContainerId} h2.ce-header {
                    font-size: 1.35em;
                }

                #${editorContainerId} h3.ce-header {
                    font-size: 1.15em;
                }

                #${editorContainerId} .ce-paragraph {
                    font-size: 14px;
                }

                #${editorContainerId} .cdx-quote {
                    padding-left: 12px;
                }

                #${editorContainerId} .ce-code__textarea {
                    font-size: 13px;
                    padding: 8px;
                }

                #${editorContainerId} .tc-cell {
                    padding: 6px;
                    font-size: 13px;
                }
            }

            /* Large Desktop (> 1440px) */
            @media (min-width: 1441px) {
                #${editorContainerId} {
                    padding: 24px;
                    min-height: 500px;
                }

                #${editorContainerId} .ce-block__content {
                    max-width: 900px;
                    margin: 0 auto;
                }

                #${editorContainerId} h1.ce-header {
                    font-size: 3em;
                }

                #${editorContainerId} h2.ce-header {
                    font-size: 2.25em;
                }

                #${editorContainerId} .ce-paragraph {
                    font-size: 18px;
                }
            }

            /* ============ SMOOTH TRANSITIONS ============ */
            #${editorContainerId},
            #${editorContainerId} .ce-toolbar__plus,
            #${editorContainerId} .ce-toolbar__settings-btn,
            #${editorContainerId} .ce-popover,
            #${editorContainerId} .ce-inline-toolbar,
            #${editorContainerId} .ce-conversion-toolbar,
            #${editorContainerId} .ce-block__content,
            #${editorContainerId} .tc-wrap,
            #${editorContainerId} .cdx-warning,
            #${editorContainerId} .image-tool,
            #${editorContainerId} .ce-code__textarea {
                transition: background-color 0.3s ease, 
                            color 0.3s ease, 
                            border-color 0.3s ease,
                            box-shadow 0.3s ease;
            }

            #${editorContainerId} [contenteditable="true"] {
                color: ${config.textPrimary} !important;
                caret-color: ${config.accentPrimary} !important;
            }

            /* ============ FOCUS STATES ============ */
            #${editorContainerId} [contenteditable="true"]:focus {
                outline: none;
            }

            #${editorContainerId} .ce-block:focus-within .ce-block__content {
                box-shadow: inset 0 0 0 1px ${config.accentLight};
            }

            /* ============ PLACEHOLDER ============ */
            #${editorContainerId} [data-placeholder]:empty::before {
                color: ${config.textMuted};
                font-style: italic;
                opacity: 0.7;
            }
        `;

        document.head.appendChild(style);
    }, [editorContainerId, theme]);

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