// Editor.js API Type Definitions

export interface BlocksAPI {
    getCurrentBlockIndex(): number;
    getBlockByIndex(index: number): BlockAPI;
    getBlocksCount(): number;
    update(id: string | number, data: Partial<BlockData>): Promise<void>;
    delete(index?: number): void;
    insert(type?: string, data?: Record<string, unknown>, config?: ToolConfig, index?: number, needToFocus?: boolean): void;
    clear(): void;
    render(data: OutputData): Promise<void>;
    stretchBlock(index: number, status?: boolean): void;
}

export interface BlockData {
    type: string;
    data: Record<string, unknown>;
    tunes?: Record<string, unknown>;
}

export interface BlockAPI {
    id: string;
    type: string;
    data: Record<string, unknown>;
    holder: HTMLElement;
    stretched: boolean;
}

export interface ToolConfig {
    class?: unknown;
    inlineToolbar?: boolean | string[];
    config?: Record<string, unknown>;
    shortcut?: string;
    toolbox?: ToolboxConfig;
    tunes?: string[];
}

export interface ToolboxConfig {
    icon?: string;
    title?: string;
}

export interface OutputData {
    time?: number;
    blocks: Array<{
        id?: string;
        type: string;
        data: Record<string, unknown>;
        tunes?: Record<string, unknown>;
    }>;
    version?: string;
}

export interface SelectionAPI {
    findParentTag(tagName: string, className?: string): HTMLElement | null;
    expandToTag(element: HTMLElement): void;
    save(): Range | null;
    restore(range: Range): void;
}

export interface CaretAPI {
    setToFirstBlock(): void;
    setToLastBlock(): void;
    setToPreviousBlock(): void;
    setToNextBlock(): void;
    setToBlock(index: number): void;
    focus(atEnd?: boolean): void;
}

export interface ToolbarAPI {
    open(): void;
    close(): void;
}

export interface SanitizerAPI {
    clean(taintString: string, rules: SanitizerRules): string;
}

export interface SanitizerRules {
    [key: string]: boolean | Record<string, boolean>;
}

export interface I18nAPI {
    t(key: string): string;
}

export interface StylesAPI {
    block: string;
    blockContent: string;
    inlineToolButton: string;
    inlineToolButtonActive: string;
    settingsButton: string;
    settingsButtonActive: string;
    button: string;
}

export interface ListenersAPI {
    on(element: HTMLElement | string, eventType: string, handler: EventListener, useCapture?: boolean): void;
    off(element: HTMLElement | string, eventType: string, handler: EventListener): void;
}

export interface SaverAPI {
    save(): Promise<OutputData>;
}

export interface UILibAPI {
    nodes: {
        redraw(): void;
    };
}

export interface API {
    blocks: BlocksAPI;
    selection: SelectionAPI;
    caret: CaretAPI;
    toolbar: ToolbarAPI;
    sanitizer: SanitizerAPI;
    i18n: I18nAPI;
    styles: StylesAPI;
    listeners: ListenersAPI;
    saver: SaverAPI;
    ui: UILibAPI;
}

// Constructor options for Block Tools
export interface BlockToolConstructorOptions<TData = Record<string, unknown>, TConfig = Record<string, unknown>> {
    api: API;
    data: TData;
    config?: TConfig;
    block?: BlockAPI;
    readOnly?: boolean;
}

// Constructor options for Block Tunes
export interface BlockTuneConstructorOptions<TData = Record<string, unknown>> {
    api: API;
    data?: TData;
    block?: BlockAPI;
    config?: ToolConfig;
}

// Block Tool instance interface (instance methods)
export interface BlockToolInstance {
    render(): HTMLElement | Promise<HTMLElement>;
    save(blockContent: HTMLElement): Record<string, unknown> | Promise<Record<string, unknown>>;
    validate?(savedData: Record<string, unknown>): boolean;
    merge?(data: Record<string, unknown>): Record<string, unknown>;
    onPaste?(event: ClipboardEvent): void;
}

// Block Tool class interface (static methods)
export interface BlockToolConstructable {
    new(options: BlockToolConstructorOptions): BlockToolInstance;
    toolbox?: ToolboxConfig;
    isReadOnlySupported?: boolean;
    enableLineBreaks?: boolean;
    pasteConfig?: PasteConfig;
    sanitize?: SanitizerConfig;
    conversionConfig?: ConversionConfig;
    prepare?: (data: { config: ToolConfig }) => void;
}

export interface PasteConfig {
    tags?: string[];
    files?: {
        mimeTypes?: string[];
        extensions?: string[];
    };
    patterns?: {
        [key: string]: RegExp;
    };
}

export interface SanitizerConfig {
    [key: string]: boolean | Record<string, boolean | string[]>;
}

export interface ConversionConfig {
    export?: string | ((data: Record<string, unknown>) => string);
    import?: string | ((data: string) => Record<string, unknown>);
}

// Block Tune instance interface
export interface BlockTuneInstance {
    render(): HTMLElement;
    wrap(blockContent: HTMLElement): HTMLElement;
    save(): Record<string, unknown>;
}

// Block Tune class interface
export interface BlockTuneConstructable {
    new(options: BlockTuneConstructorOptions): BlockTuneInstance;
    isTune: boolean;
}

// Inline Tool instance interface
export interface InlineToolInstance {
    render(): HTMLElement;
    surround(range: Range): void;
    checkState(selection: Selection): boolean;
    clear?(): void;
    sanitize?: SanitizerConfig;
}

// Inline Tool class interface
export interface InlineToolConstructable {
    new(options: { api: API; config?: ToolConfig }): InlineToolInstance;
    isInline: boolean;
    shortcut?: string;
    title?: string;
    sanitize?: SanitizerConfig;
}

// Union type for all tool types
export type ToolConstructable = BlockToolConstructable | BlockTuneConstructable | InlineToolConstructable;