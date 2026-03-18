// https://docs.strapi.io/cms/backend-customization/routes

import { factories } from '@strapi/strapi';

// For custom routes that don't map to core CRUD operations,
// you need to export a plain routes object, not createCoreRouter.
// But you can structure it similarly:

export default {
    routes: [
      {
        method: 'POST',
        path: '/articles/:documentId/view',
        handler: 'view-counter.incrementView',
        config: {
          auth: { enabled: false },
          // Remove policies completely
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/articles/:documentId/views',
        handler: 'view-counter.getViewCount',
        config: {
          auth: { enabled: false },
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/articles/most-viewed',
        handler: 'view-counter.getMostViewed',
        config: {
          auth: { enabled: false },
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/admin/articles/reset-views',
        handler: 'view-counter.resetViews',
        config: {
          auth: { enabled: true },
          // Remove policies completely
          middlewares: [],
        },
      },
    ],
  };