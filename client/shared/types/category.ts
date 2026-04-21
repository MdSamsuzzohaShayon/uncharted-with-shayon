import type { IArticle } from "./article";
import type { IDocument } from "./element";
import type { IImage } from "./image";

export interface ICategory extends IDocument{
    id: number;
    name: string;
    slug: number;
    icon: IImage;
    articles: ReadonlyArray<IArticle>;
    featured_image: IImage;
}

export interface ICategoriesResponse{
    data: ICategory[];
}