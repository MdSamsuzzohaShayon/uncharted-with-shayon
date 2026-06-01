/**
 * /server/api/home-data.get.ts
 *
 * Cached server route that fetches ALL home page data in parallel and
 * stores the result with Nitro's built-in cache (stale-while-revalidate).
 *
 * • One round-trip per revalidation window instead of 4 sequential fetches.
 * • The cache lives on the server; the client receives a single JSON blob.
 * • maxAge / staleMaxAge are tuned for a travel blog (content changes infrequently).
 */

import type {
  IActivitiesResponse,
  IArticle,
  ICategory,
  IActivity,
  ICategoriesResponse,
  IFeaturedArticlesResponse,
  IHomePageData,
  ILatestArticleResponse,
} from '~~/shared/types';

export default defineCachedEventHandler(
  async (event): Promise<IHomePageData> => {
    const config = useRuntimeConfig(event);
    const { backendApi, accessToken, fullAccessToken } = config.public as {
      backendApi: string;
      accessToken: string;
      fullAccessToken: string;
    };

    const authHeader = (token: string) => ({
      Authorization: `Bearer ${token}`,
    });

    // ── Fire all four requests in parallel ──────────────────────────────
    const [latestRes, featuredRes, categoriesRes, activitiesRes] =
      await Promise.all([
        $fetch<ILatestArticleResponse>(`${backendApi}/api/articles`, {
          headers: authHeader(accessToken),
          params: {
            sort: ['published_date:desc'],
            'fields[0]': 'title',
            'fields[1]': 'slug',
            'fields[2]': 'documentId',
            'fields[3]': 'meta_title',
            'pagination[limit]': 5,
            'populate[featured_image][fields][0]': 'url',
          },
        }),

        $fetch<IFeaturedArticlesResponse>(`${backendApi}/api/featured-posts`, {
          headers: authHeader(fullAccessToken),
          params: {
            'pagination[start]': 0,
            'pagination[limit]': 3,
            'fields[0]': 'title',
            'fields[1]': 'slug',
            'fields[2]': 'documentId',
            'fields[3]': 'content',
            'fields[4]': 'published_date',
            'populate[featured_image][fields][0]': 'url',
            'populate[categories][fields][0]': 'name',
            'populate[categories][fields][1]': 'slug',
          },
        }),

        $fetch<ICategoriesResponse>(`${backendApi}/api/categories`, {
          headers: authHeader(accessToken),
          params: {
            'fields[0]': 'name',
            'fields[1]': 'slug',
            'fields[2]': 'documentId',
            'populate[icon][fields][0]': 'url',
            'populate[featured_image][fields][0]': 'url',
          },
        }),

        $fetch<IActivitiesResponse>(`${backendApi}/api/activities`, {
          headers: authHeader(accessToken),
          params: {
            'fields[0]': 'documentId',
            'fields[1]': 'name',
            'pagination[limit]': 100,
            'populate[icon][fields][0]': 'url',
          },
        }),
      ]);

    return {
      latestArticles: latestRes.data,
      featuredArticles: featuredRes.data,
      categories: categoriesRes.data,
      activities: activitiesRes.data,
    };
  },

  // ── Nitro cache options ────────────────────────────────────────────────
  {
    maxAge: 60 * 5,       // Serve fresh cache for 5 min
    staleMaxAge: 60 * 60, // Serve stale for up to 1 hr while revalidating in bg
    swr: true,            // Enable stale-while-revalidate
    name: 'home-page-data',
    getKey: () => 'home',  // Single cache key – same data for every visitor
  }
);
