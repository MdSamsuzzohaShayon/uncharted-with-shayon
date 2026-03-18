import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

// Define helpers outside for reusability
const helpers = {
  generateExcerpt(content: string, length: number = 150): string {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    return plainText.length <= length ? plainText : plainText.substring(0, length).trim() + '...';
  },

  calculateReadingTime(content: string): number {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  },

  formatDate(date: string | null): string | null {
    if (!date) return null;
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  },
};

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }: { strapi: Core.Strapi }) => ({
    // Custom service for enhanced featured posts
    async getEnhancedFeaturedPosts(page: number = 1, pageSize: number = 10) {
      try {
        const validPage = Math.max(1, page);
        const validPageSize = Math.min(100, Math.max(1, pageSize));

        const posts = await strapi.documents('api::article.article').findMany({
          filters: {
            featured: true,
            publishedAt: { $notNull: true },
          },
          sort: { published_date: 'desc' },
          populate: {
            author: true,
            categories: true,
            featured_image: true,
            tags: true,
          },
          limit: validPageSize,
          start: (validPage - 1) * validPageSize,
        }) || [];

        const total = await strapi.documents('api::article.article').count({
          filters: {
            featured: true,
            publishedAt: { $notNull: true },
          },
        });

        // Use helpers consistently
        const enhancedPosts = posts.map(post => ({
          ...post,
          excerpt: helpers.generateExcerpt(post.description || ''),
          readingTime: helpers.calculateReadingTime(post.description || ''),
          publishedDateFormatted: post.published_date ? helpers.formatDate(post.published_date as string) : null,
        }));

        return {
          posts: enhancedPosts,
          pagination: {
            page: validPage,
            pageSize: validPageSize,
            pageCount: Math.ceil(total / validPageSize),
            total,
          },
        };
      } catch (error) {
        throw new Error(`Failed to get enhanced featured posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Custom method for trending posts
    async findTrending(limit: number = 5) {
      try {
        const validLimit = Math.min(20, Math.max(1, limit));

        const posts = await strapi.documents('api::article.article').findMany({
          filters: {
            publishedAt: { $notNull: true },
            featured: true, // Only show featured posts
          },
          sort: { published_date: 'desc' },
          populate: {
            featured_image: true,
            categories: true,
          },
          limit: validLimit,
        });

        return posts.map(post => ({
          ...post,
          excerpt: helpers.generateExcerpt(post.description || ''),
          readingTime: helpers.calculateReadingTime(post.description || ''),
        }));
      } catch (error) {
        throw new Error(`Failed to get trending posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Custom method for latest posts
    async findLatest(limit: number = 5) {
      try {
        const validLimit = Math.min(20, Math.max(1, limit));

        const posts = await strapi.documents('api::article.article').findMany({
          filters: {
            publishedAt: { $notNull: true },
            featured: true, // Only show featured posts
          },
          sort: { published_date: 'desc' },
          populate: {
            featured_image: true,
            categories: true,
          },
          limit: validLimit,
        });

        return posts.map(post => ({
          ...post,
          excerpt: helpers.generateExcerpt(post.description || ''),
          readingTime: helpers.calculateReadingTime(post.description || ''),
        }));
      } catch (error) {
        throw new Error(`Failed to get latest posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  })
);