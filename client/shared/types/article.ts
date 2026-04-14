// types/article.ts

import type { IActivity } from "./activity";
import type { ICategory } from "./category";
import type { IDocument } from "./element";
import type { IImage } from "./image";
import type { ITag } from "./tag";

// Base response structure from Strapi
export interface IStrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    }
}



// Enhanced article interface matching Strapi response
export interface IArticle extends IDocument {
    title: string;
    slug: string;
    youtube_url: string | null;
    published_date: string;
    travel_cost: number | null;
    best_time: string | null;
    map_lat: number | null;
    map_lng: number | null;
    meta_title: string | null;
    meta_description: string | null;
    canonical_url: string | null;
    views: number;
    description: string;
    og_image?: string;
    featured_image: IImage | null;
    gallery: ReadonlyArray<IImage>;
    categories: ReadonlyArray<ICategory>;
    tags: ReadonlyArray<ITag>;
    activities: ReadonlyArray<IActivity>;
}

// Computed location string (from coordinates or fallback)
export interface IArticleWithLocation extends IArticle {
    location: string;
}

// API response types
export interface IArticleBySlugResponse extends IStrapiResponse<IArticle> { }

// Helper type for component use
export type ArticleData = IArticle | null;

export interface ILatestArticleResponse {
    data: IArticle[];
}

export interface IFeaturedArticlesResponse {
    data: IArticle[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
        }
    };
}

export interface ILatestArticlesGrouped {
    latestOne: IArticle | null;
    latestTwo: IArticle | null;
    latestThree: IArticle | null;
    latestFour: IArticle | null;
    latestFive: IArticle | null;
}

export interface IArticleSpan extends IArticle {
    span: string;
}