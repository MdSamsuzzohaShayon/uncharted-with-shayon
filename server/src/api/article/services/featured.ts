import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', () => ({
  async findFeatured(ctx) {
    try {
      const page = parseInt(ctx.query.page as string) || 1;
      const pageSize = parseInt(ctx.query.pageSize as string) || 10;
      const validPage = Math.max(1, page);
      const validPageSize = Math.min(100, Math.max(1, pageSize));

      const generateExcerpt = (content: string) => {
        if (!content) return '';
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        return plainText.length <= 150 ? plainText : plainText.substring(0, 150).trim() + '...';
      };

      // Use raw DB query to avoid type issues
      const posts = await strapi.db.query('api::article.article').findMany({
        where: {
          featured: true,
          publishedAt: { $notNull: true },
        },
        orderBy: { published_date: 'desc' },
        populate: {
          author: true,
          categories: true,
          featured_image: true,
          tags: true,
        },
        limit: validPageSize,
        offset: (validPage - 1) * validPageSize,
      });

      const total = await strapi.db.query('api::article.article').count({
        where: {
          featured: true,
          publishedAt: { $notNull: true },
        },
      });

      const enhancedPosts = posts.map((post: any) => ({
        ...post,
        excerpt: generateExcerpt(post.description || ''),
      }));

      return {
        data: enhancedPosts,
        meta: {
          pagination: {
            page: validPage,
            pageSize: validPageSize,
            pageCount: Math.ceil(total / validPageSize),
            total,
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