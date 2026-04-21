declare module '@editorjs/editorjs' {
    export interface I18nConfig {
        messages?: {
            toolNames?: Record<string, string>;
            tools?: Record<string, Record<string, string>>;
            ui?: Record<string, string>;
        };
        locale?: string;
    }

    export interface EditorConfig {
        holder?: string | HTMLElement;
        autofocus?: boolean;
        defaultBlock?: string;
        placeholder?: string | false;
        tools?: Record<string, any>;
        data?: any;
        readOnly?: boolean;
        minHeight?: number;
        inlineToolbar?: string[] | boolean;
        tunes?: string[];
        onChange?: (api?: any, event?: any) => void;
        onReady?: () => void;
        i18n?: I18nConfig; // Add i18n property
        sanitizer?: any;
        hideToolbar?: boolean;
        logLevel?: string;
    }

    export interface OutputData {
        time?: number;
        blocks: Array<{
            id?: string;
            type: string;
            data: Record<string, any>;
            tunes?: Record<string, any>;
        }>;
        version?: string;
    }

    export interface API {
        blocks: any;
        caret: any;
        sanitizer: any;
        toolbar: any;
        events: any;
        i18n: any;
        listeners: any;
        saver: any;
        selection: any;
        styles: any;
        ui: any;
    }

    export default class EditorJS {
        constructor(config?: EditorConfig);
        save(): Promise<OutputData>;
        destroy(): Promise<void>;
        render(data: OutputData): Promise<void>;
        clear(): Promise<void>;
        focus(): void;
        blocks: any;
        caret: any;
        toolbar: any;
        saver: any;
    }

    export interface BlockAPI {
        id: string;
        type: string;
        data: any;
        holder: HTMLElement;
        stretched: boolean;
        call(methodName: string, ...args: any[]): any;
        dispatchPluginMethod(methodName: string, ...args: any[]): any;
        dispatchBlockMethod(methodName: string, ...args: any[]): any;
    }

    export interface BlockToolConstructorOptions<D = any, C = any> {
        api: API;
        data: D;
        config?: C;
        block?: BlockAPI;
        readOnly?: boolean;
    }

    export interface BlockToolConstructable {
        new(config: BlockToolConstructorOptions): any;
        isReadOnlySupported?: boolean;
        toolbox?: {
            icon?: string;
            title?: string;
        };
        enableLineBreaks?: boolean;
        pasteConfig?: any;
        sanitize?: any;
        conversionConfig?: any;
    }

    export interface InlineToolConstructable {
        new(config: any): any;
        isInline: boolean;
        sanitize?: any;
        shortcut?: string;
    }

    export interface BlockTuneConstructable {
        new(config: any): any;
        isTune: boolean;
    }

    export type ToolConstructable = BlockToolConstructable | InlineToolConstructable | BlockTuneConstructable;

    export interface ToolSettings {
        class: ToolConstructable;
        inlineToolbar?: boolean | string[];
        config?: any;
        shortcut?: string;
        toolbox?: any;
        tunes?: string[];
    }
}

// Declare all tool modules
declare module '@editorjs/header' {
    const Header: any;
    export default Header;
}

declare module '@editorjs/list' {
    const List: any;
    export default List;
}

declare module '@editorjs/nested-list' {
    const NestedList: any;
    export default NestedList;
}

declare module '@editorjs/paragraph' {
    const Paragraph: any;
    export default Paragraph;
}

declare module '@editorjs/quote' {
    const Quote: any;
    export default Quote;
}

declare module '@editorjs/image' {
    const ImageTool: any;
    export default ImageTool;
}

declare module '@editorjs/table' {
    const Table: any;
    export default Table;
}

declare module '@editorjs/code' {
    const CodeTool: any;
    export default CodeTool;
}

declare module '@editorjs/link' {
    const LinkTool: any;
    export default LinkTool;
}

declare module '@editorjs/embed' {
    const Embed: any;
    export default Embed;
}

declare module '@editorjs/delimiter' {
    const Delimiter: any;
    export default Delimiter;
}

declare module '@editorjs/warning' {
    const Warning: any;
    export default Warning;
}

declare module '@editorjs/marker' {
    const Marker: any;
    export default Marker;
}

declare module '@editorjs/inline-code' {
    const InlineCode: any;
    export default InlineCode;
}

declare module '@editorjs/checklist' {
    const Checklist: any;
    export default Checklist;
}

declare module '@editorjs/underline' {
    const Underline: any;
    export default Underline;
}

declare module '@editorjs/attaches' {
    const AttachesTool: any;
    export default AttachesTool;
}

declare module '@editorjs/raw' {
    const RawTool: any;
    export default RawTool;
}

// Third-party tools
declare module 'editorjs-undo' {
    const Undo: any;
    export default Undo;
}

declare module 'editorjs-drag-drop' {
    const DragDrop: any;
    export default DragDrop;
}

declare module 'editorjs-text-alignment-blocktune' {
    const AlignmentBlockTune: any;
    export default AlignmentBlockTune;
}

declare module 'editorjs-inline-font-size' {
    const InlineFontSize: any;
    export default InlineFontSize;
}

declare module 'editorjs-hyperlink' {
    const Hyperlink: any;
    export default Hyperlink;
}

declare module 'editorjs-style' {
    const Style: any;
    export default Style;
}