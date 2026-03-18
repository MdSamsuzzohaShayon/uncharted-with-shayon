import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }: { strapi: Core.Strapi }) => ({
    // Custom action for featured posts (Method 3 from docs: replacing core action with proper sanitization)
    async findFeatured(ctx) {
      try {
        // Step 1: Validate query (optional but recommended)
        await this.validateQuery(ctx);

        // Step 2: Sanitize query to remove invalid/unauthorized params
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);

        const page = parseInt(sanitizedQueryParams.page as string) || 1;
        const pageSize = parseInt(sanitizedQueryParams.pageSize as string) || 10;

        // Call the custom service
        const result = await strapi
          .service('api::featured-articles.featured-articles')
          .getEnhancedFeaturedPosts(page, pageSize);

        // Step 3: Sanitize output to remove private fields
        const sanitizedPosts = await this.sanitizeOutput(result.posts, ctx);

        // Step 4: Use transformResponse for consistent formatting
        return this.transformResponse(sanitizedPosts, {
          pagination: result.pagination,
        });
      } catch (error) {
        console.error('Error in findFeatured:', error);
        ctx.status = 500;
        return {
          error: {
            message: 'Failed to fetch featured posts',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        };
      }
    },

    // Custom endpoint for trending posts
    async findTrending(ctx) {
      try {
        await this.validateQuery(ctx);
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        
        const limit = parseInt(sanitizedQueryParams.limit as string) || 5;

        const posts = await strapi
          .service('api::featured-articles.featured-articles')
          .findTrending(limit);

        const sanitizedPosts = await this.sanitizeOutput(posts, ctx);

        return this.transformResponse(sanitizedPosts, {
          total: posts.length,
          limit,
        });
      } catch (error) {
        console.error('Error in findTrending:', error);
        ctx.status = 500;
        return {
          error: {
            message: 'Failed to fetch trending posts',
          },
        };
      }
    },

    // Custom endpoint for latest posts
    async findLatest(ctx) {
      try {
        await this.validateQuery(ctx);
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        
        const limit = parseInt(sanitizedQueryParams.limit as string) || 5;

        const posts = await strapi
          .service('api::featured-articles.featured-articles')
          .findLatest(limit);

        const sanitizedPosts = await this.sanitizeOutput(posts, ctx);

        return this.transformResponse(sanitizedPosts, {
          total: posts.length,
          limit,
        });
      } catch (error) {
        console.error('Error in findLatest:', error);
        ctx.status = 500;
        return {
          error: {
            message: 'Failed to fetch latest posts',
          },
        };
      }
    },
  })
);