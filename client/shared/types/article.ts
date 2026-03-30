export interface IArticle {
    id: number;
    title: string;
    featured_image: {
        url: string;
    };
    slug: string;
    description: string;
    published_date: string;

    // Temp
    category: any;
}


export interface ILatestArticleResponse {
    data: IArticle[]
}