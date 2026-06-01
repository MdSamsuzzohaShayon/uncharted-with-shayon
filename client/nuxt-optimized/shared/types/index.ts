// ─────────────────────────────────────────────
// Shared API Response Types
// ─────────────────────────────────────────────

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

// ─────────────────────────────────────────────
// Domain Models
// ─────────────────────────────────────────────

export interface ICategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  icon: StrapiMedia | null;
  featured_image: StrapiMedia | null;
}

export interface IActivity {
  id: number;
  documentId: string;
  name: string;
  icon: StrapiMedia | null;
}

export interface IArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  content?: string | null;
  published_date: string | null;
  featured_image: StrapiMedia | null;
  categories: Pick<ICategory, 'name' | 'slug'>[];
  meta_title?: string | null;
}

export interface IArticleSpan extends IArticle {
  span: string;
}

// ─────────────────────────────────────────────
// API Response Wrappers
// ─────────────────────────────────────────────

export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface ICategoriesResponse extends StrapiListResponse<ICategory> {}
export interface IActivitiesResponse extends StrapiListResponse<IActivity> {}
export interface ILatestArticleResponse extends StrapiListResponse<IArticle> {}
export interface IFeaturedArticlesResponse extends StrapiListResponse<IArticle> {}

// ─────────────────────────────────────────────
// UI State
// ─────────────────────────────────────────────

/** Cached payload stored in Nitro's server-side cache */
export interface IHomePageData {
  latestArticles: IArticle[];
  featuredArticles: IArticle[];
  categories: ICategory[];
  activities: IActivity[];
}
