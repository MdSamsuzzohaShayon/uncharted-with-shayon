import { useEffect, useState } from 'react';

export const useStrapiTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialize with correct value immediately
    const htmlElement = document.documentElement;
    const isDark = htmlElement.getAttribute('data-strapi-theme') === 'dark' ||
                   htmlElement.classList.contains('dark') ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      const isDark = htmlElement.getAttribute('data-strapi-theme') === 'dark' ||
                     htmlElement.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const newTheme = isDark ? 'dark' : 'light';
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    };

    // Watch for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-strapi-theme', 'class'],
    });

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', detectTheme);
    };
  }, [theme]);

  return theme;
};