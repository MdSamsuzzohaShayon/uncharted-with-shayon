import type { IImage } from "./image";

export interface ICategory{
    id: number;
    name: string;
    slug: number;
    icon: IImage;
    article: null;
    featured_image: IImage;
}

export interface ICategoriesResponse{
    data: ICategory[];
}