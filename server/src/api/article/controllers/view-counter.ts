// src/api/article/controllers/view-counter.ts

import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

export default factories.createCoreController(
    'api::article.article',
    ({ strapi }: { strapi: Core.Strapi }) => ({
        // Increment view count when article is viewed
        async incrementView(ctx) {
            try {
                const { documentId } = ctx.params;

                // FIXED: Remove populate option and use fields to select only what you need
                const article = await strapi.documents('api::article.article').findOne({
                    documentId,
                    fields: ['views'], // Only fetch the views field
                });

                if (!article) {
                    return ctx.notFound('Article not found');
                }

                // Increment the view count
                const currentViews = article.views || 0;
                const updatedArticle = await strapi.documents('api::article.article').update({
                    documentId,
                    data: {
                        views: currentViews + 1,
                    },
                    fields: ['views'], // Only return the views field
                });

                // Return success response
                return {
                    data: {
                        documentId: updatedArticle.documentId,
                        views: updatedArticle.views,
                    },
                    meta: {
                        timestamp: new Date().toISOString(),
                    },
                };
            } catch (error) {
                console.error('Error incrementing view count:', error);
                ctx.status = 500;
                return {
                    error: {
                        message: 'Failed to increment view count',
                        details: error instanceof Error ? error.message : 'Unknown error',
                    },
                };
            }
        },

        // Get view count for an article
        async getViewCount(ctx) {
            try {
                const { documentId } = ctx.params;

                const article = await strapi.documents('api::article.article').findOne({
                    documentId,
                    fields: ['views'], // Only fetch the views field
                });

                if (!article) {
                    return ctx.notFound('Article not found');
                }

                return {
                    data: {
                        documentId: article.documentId,
                        views: article.views || 0,
                    },
                };
            } catch (error) {
                console.error('Error getting view count:', error);
                ctx.status = 500;
                return {
                    error: {
                        message: 'Failed to get view count',
                    },
                };
            }
        },

        // Get most viewed articles (for trending section)
        async getMostViewed(ctx) {
            try {
                // Add query validation as recommended in docs
                await this.validateQuery(ctx);
                const sanitizedQueryParams = await this.sanitizeQuery(ctx);

                const limit = parseInt(sanitizedQueryParams.limit as string) || 10;
                const validLimit = Math.min(50, Math.max(1, limit));

                const articles = await strapi.documents('api::article.article').findMany({
                    filters: {
                        publishedAt: { $notNull: true },
                    },
                    sort: { views: 'desc' },
                    populate: {
                        featured_image: true,
                        categories: true,
                    },
                    limit: validLimit,
                });

                // Sanitize output as recommended in docs
                const sanitizedArticles = await this.sanitizeOutput(articles, ctx);

                return this.transformResponse(sanitizedArticles, {
                    pagination: {
                        total: articles.length,
                        limit: validLimit,
                    },
                });
            } catch (error) {
                console.error('Error getting most viewed articles:', error);
                ctx.status = 500;
                return {
                    error: {
                        message: 'Failed to fetch most viewed articles',
                    },
                };
            }
        },

        async resetViews(ctx) {
            try {
                // Check if user is admin (optional, since route already has policies)
                const user = ctx.state.user;
                if (!user) {
                    return ctx.unauthorized('You must be authenticated to reset views');
                }


                // Check if user has admin role
                const isAdmin = user.roles?.some((role: any) =>
                    role.code === 'strapi-super-admin' ||
                    role.code === 'admin'
                );

                if (!isAdmin) {
                    return ctx.forbidden('Only administrators can reset views');
                }


                // Get documentIds from request body if provided
                const { documentIds } = ctx.request.body as { documentIds?: string[] };

                let result;

                if (documentIds && documentIds.length > 0) {
                    // Reset views for specific articles
                    const updatePromises = documentIds.map(documentId =>
                        strapi.documents('api::article.article').update({
                            documentId,
                            data: { views: 0 },
                            fields: ['documentId', 'views'],
                        })
                    );

                    const updatedArticles = await Promise.all(updatePromises);
                    result = {
                        success: true,
                        count: updatedArticles.length,
                        articles: updatedArticles,
                    };
                } else {
                    // Reset views for all articles (use with caution!)
                    const allArticles = await strapi.documents('api::article.article').findMany({
                        fields: ['documentId'],
                        filters: {
                            publishedAt: { $notNull: true },
                        },
                    });

                    const updatePromises = allArticles.map(article =>
                        strapi.documents('api::article.article').update({
                            documentId: article.documentId,
                            data: { views: 0 },
                            fields: ['documentId', 'views'],
                        })
                    );

                    const updatedArticles = await Promise.all(updatePromises);
                    result = {
                        success: true,
                        count: updatedArticles.length,
                        articles: updatedArticles,
                    };
                }

                // Sanitize output
                const sanitizedResult = await this.sanitizeOutput(result, ctx);

                return this.transformResponse(sanitizedResult, {
                    timestamp: new Date().toISOString(),
                });
            } catch (error) {
                console.error('Error resetting views:', error);
                ctx.status = 500;
                return {
                    error: {
                        message: 'Failed to reset views',
                        details: error instanceof Error ? error.message : 'Unknown error',
                    },
                };
            }
        },
    })
);










