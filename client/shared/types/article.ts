import type { IImage } from "./image";

export interface IArticle {
    id: number;
    title: string;
    featured_image?: IImage;
    slug: string;
    description: string;
    published_date: string;
    travel_cost?: string;
    best_time?: string;
    location: string;
    views: number;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
    canonical_url?: string;
    map_lat?: number;
    map_lng?: number;
    youtube_url?: string;


    // Temp
    category: any;

}


export interface ILatestArticleResponse {
    data: IArticle[];
}

export interface IArticleBySlugResponse{
    data: IArticle[];
}