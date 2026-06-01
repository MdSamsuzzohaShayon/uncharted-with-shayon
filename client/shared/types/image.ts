import type { IDocument } from "./element";

export interface IImage extends IDocument {
    url: string;
    name: string;
    ext: string;
    mime: string;
    size: number;
}