import type { IDocument } from "./element";

export interface ITag extends IDocument{
    name: string;
    slug: string;
}