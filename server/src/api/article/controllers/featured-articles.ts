import { factories } from '@strapi/strapi';

interface PaginationParams {
  start?: string;
  limit?: string;
  page?: string;
  pageSize?: string;
}

interface QueryParams {
  pagination?: PaginationParams;
  start?: string;
  limit?: string;
  page?: string;
  pageSize?: string;
  fields?: string | string[];
  populate?: any;
  sort?: string;
}

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async findFeatured(ctx) {
    try {
      const query = ctx.query as QueryParams;
      
      // Parse pagination
      const start = parseInt(query.pagination?.start || query.start || '0');
      const limit = parseInt(query.pagination?.limit || query.limit || '10');
      
      const validStart = Math.max(0, start);
      const validLimit = Math.min(100, Math.max(1, limit));

      // Parse fields parameter
      let selectedFields: string[] | undefined;
      if (query.fields) {
        if (typeof query.fields === 'string') {
          selectedFields = query.fields.split(',');
        } else if (Array.isArray(query.fields)) {
          selectedFields = query.fields;
        }
      }

      // Always include these essential fields if not specified
      const defaultFields = ['id', 'documentId'];
      let finalFields = selectedFields;
      if (selectedFields) {
        finalFields = [...new Set([...defaultFields, ...selectedFields])];
      }

      const generateExcerpt = (content: string) => {
        if (!content) return '';
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        return plainText.length <= 150 ? plainText : plainText.substring(0, 150).trim() + '...';
      };

      // Build populate options - IMPROVED VERSION
      const populateOptions: any = {};

      // Check what populations were requested in the query
      const requestedPopulate = query.populate || {};

      // Handle featured_image population
      if (requestedPopulate.featured_image) {
        populateOptions.featured_image = {
          select: ['url', 'alternativeText', 'width', 'height']
        };
      }

      // Handle categories population
      if (requestedPopulate.categories) {
        populateOptions.categories = {
          select: requestedPopulate.categories.fields || ['id', 'name', 'slug']
        };
      }

      // Handle author population
      if (requestedPopulate.author) {
        populateOptions.author = {
          select: requestedPopulate.author.fields || ['id', 'username', 'email']
        };
      }

      // Handle tags population
      if (requestedPopulate.tags) {
        populateOptions.tags = {
          select: requestedPopulate.tags.fields || ['id', 'name', 'slug']
        };
      }

      // Build query options
      const queryOptions: any = {
        where: {
          featured: true,
          publishedAt: { $notNull: true },
        },
        orderBy: { published_date: 'desc' },
        limit: validLimit,
        offset: validStart,
      };

      // Add select if fields specified
      if (finalFields) {
        queryOptions.select = finalFields;
      }

      // Add populate if needed
      if (Object.keys(populateOptions).length > 0) {
        queryOptions.populate = populateOptions;
      }

      const posts = await strapi.db.query('api::article.article').findMany(queryOptions);
      
      const total = await strapi.db.query('api::article.article').count({
        where: {
          featured: true,
          publishedAt: { $notNull: true },
        },
      });

      // Only generate excerpt if description is selected or no fields specified
      let enhancedPosts = posts;
      if (!selectedFields || selectedFields.includes('description')) {
        enhancedPosts = posts.map((post: any) => ({
          ...post,
          excerpt: generateExcerpt(post.description || ''),
        }));
      }

      return {
        data: enhancedPosts,
        meta: {
          pagination: {
            start: validStart,
            limit: validLimit,
            total: total,
          },
        },
      };
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
}));