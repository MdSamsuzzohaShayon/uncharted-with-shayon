import type { IArticle } from "./article";
import type { IImage } from "./image";
import type { ILocation } from "./location";
import type { ITag } from "./tag";

export interface IActivity{
    id: number;
    title: string;
    name: string;
    slug: string;
    icon: IImage;
    description: string;
    featured_image: IImage;
    short_description: string;
    gallery: IImage;
    duration: string;
    cost: number;
    location: ILocation;
    articles: IArticle[];
    tags: ITag[]
}

export interface IActivitiesResponse{
    data: IActivity[];
}