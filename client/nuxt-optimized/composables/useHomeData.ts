/**
 * composables/useHomeData.ts
 *
 * Single composable for ALL home-page data.
 * - Calls our cached `/api/home-data` server route (one HTTP request).
 * - `useAsyncData` deduplicates the call: it runs once on SSR and is
 *   rehydrated on the client without a second network request.
 * - Transforms are computed properties – O(n) at most, nothing repeated.
 */

import type {
  IArticle,
  IArticleSpan,
  ICategory,
  IActivity,
  IHomePageData,
} from '~~/shared/types';

// Span pattern is fixed; define once outside the composable (not re-created on every render).
const MOSAIC_SPANS = [
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
] as const;

export interface UseHomeDataReturn {
  /** All raw data from the server */
  data: Ref<IHomePageData | null>;
  /** Whether the request is still in flight */
  pending: Ref<boolean>;
  /** Any error thrown by the fetch */
  error: Ref<Error | null>;
  /** Derived: article list for the mosaic, with span classes applied */
  latestGrouped: ComputedRef<IArticleSpan[]>;
  /** Derived: first featured article (hero card) */
  firstArticle: ComputedRef<IArticle | null>;
  /** Derived: remaining two featured articles */
  nextTwoArticles: ComputedRef<IArticle[]>;
  /** Derived: flat category list */
  categories: ComputedRef<ICategory[]>;
  /** Derived: flat activity list */
  activities: ComputedRef<IActivity[]>;
}

export function useHomeData(): UseHomeDataReturn {
  const { data, pending, error } = useAsyncData<IHomePageData>(
    'home-page',
    () => $fetch<IHomePageData>('/api/home-data'),
    {
      // Don't re-fetch when navigating back to this page within the same session.
      dedupe: 'defer',
    }
  );

  // ── Derived computeds (cheap transforms, not repeated per render) ──────

  const latestGrouped = computed<IArticleSpan[]>(() =>
    (data.value?.latestArticles ?? []).map((article, i) => ({
      ...article,
      span: MOSAIC_SPANS[i] ?? '',
    }))
  );

  const firstArticle = computed<IArticle | null>(
    () => data.value?.featuredArticles?.[0] ?? null
  );

  const nextTwoArticles = computed<IArticle[]>(
    () => data.value?.featuredArticles?.slice(1, 3) ?? []
  );

  const categories = computed<ICategory[]>(
    () => data.value?.categories ?? []
  );

  const activities = computed<IActivity[]>(
    () => data.value?.activities ?? []
  );

  return {
    data,
    pending,
    error: error as Ref<Error | null>,
    latestGrouped,
    firstArticle,
    nextTwoArticles,
    categories,
    activities,
  };
}
