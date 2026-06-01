/**
 * composables/useHeroBg.ts
 *
 * Manages the hero background cross-fade animation.
 * Extracted so the logic is reusable and the page stays clean.
 */

import type { ICategory } from '~~/shared/types';

const FADE_DURATION_MS = 420;

export function useHeroBg(
  categories: Ref<ICategory[]>,
  defaultBgUrl: string
) {
  const heroBg = ref<string>(defaultBgUrl);
  const bgFading = ref<boolean>(false);
  const activeCategoryId = ref<number | null>(null);

  function crossFadeBg(src: string | null): void {
    if (!src) return;
    bgFading.value = true;
    setTimeout(() => {
      heroBg.value = src;
      bgFading.value = false;
    }, FADE_DURATION_MS);
  }

  function setHeroBg(categoryId: number): void {
    // Toggle off: reset to default
    if (activeCategoryId.value === categoryId) {
      activeCategoryId.value = null;
      crossFadeBg(defaultBgUrl);
      return;
    }

    activeCategoryId.value = categoryId;

    const matched = categories.value.find((c) => c.id === categoryId);
    if (matched?.featured_image?.url) {
      crossFadeBg(matched.featured_image.url);
    }
  }

  return {
    heroBg,
    bgFading,
    activeCategoryId,
    setHeroBg,
  };
}
