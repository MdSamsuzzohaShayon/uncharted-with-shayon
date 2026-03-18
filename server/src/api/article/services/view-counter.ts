// https://docs.strapi.io/cms/backend-customization/services

import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

export default factories.createCoreService(
  'api::article.article',
  ({ strapi }: { strapi: Core.Strapi }) => ({
    // Service method to increment view count
    async incrementView(documentId: string) {
      try {
        const article = await strapi.documents('api::article.article').findOne({
          documentId,
          fields: ['views'],
        });

        if (!article) {
          throw new Error('Article not found');
        }

        const currentViews = article.views || 0;
        
        const updatedArticle = await strapi.documents('api::article.article').update({
          documentId,
          data: {
            views: currentViews + 1,
          },
          fields: ['views'], // Only return the views field
        });

        return {
          documentId: updatedArticle.documentId,
          views: updatedArticle.views,
        };
      } catch (error) {
        throw new Error(`Failed to increment view count: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Service method to get view count
    async getViewCount(documentId: string) {
      try {
        const article = await strapi.documents('api::article.article').findOne({
          documentId,
          fields: ['views'],
        });

        if (!article) {
          throw new Error('Article not found');
        }

        return {
          documentId: article.documentId,
          views: article.views || 0,
        };
      } catch (error) {
        throw new Error(`Failed to get view count: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Service method to get most viewed articles
    async getMostViewed(limit: number = 10) {
      try {
        const validLimit = Math.min(50, Math.max(1, limit));

        const articles = await strapi.documents('api::article.article').findMany({
          filters: {
            publishedAt: { $notNull: true },
          },
          sort: { views: 'desc' },
          populate: {
            featured_image: true,
            categories: true,
            author: true,
          },
          limit: validLimit,
        });

        return articles;
      } catch (error) {
        throw new Error(`Failed to get most viewed articles: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Service method to bulk reset view counts (admin only)
    async resetViews(documentIds?: string[]) {
      try {
        const updatePromises = [];

        if (documentIds && documentIds.length > 0) {
          // Reset views for specific articles
          for (const documentId of documentIds) {
            updatePromises.push(
              strapi.documents('api::article.article').update({
                documentId,
                data: { views: 0 },
              })
            );
          }
        } else {
          // Reset views for all articles (use with caution!)
          const allArticles = await strapi.documents('api::article.article').findMany({
            fields: ['documentId'],
          });

          for (const article of allArticles) {
            updatePromises.push(
              strapi.documents('api::article.article').update({
                documentId: article.documentId,
                data: { views: 0 },
              })
            );
          }
        }

        await Promise.all(updatePromises);

        return {
          success: true,
          count: updatePromises.length,
        };
      } catch (error) {
        throw new Error(`Failed to reset views: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  })
);