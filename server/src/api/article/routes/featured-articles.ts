// https://docs.strapi.io/cms/backend-customization/routes

export default {
    routes: [
      {
        method: 'GET',
        path: '/featured-posts',
        handler: 'featured-articles.findFeatured',
        config: {
          auth: { enabled: false }, // Fixed: object format with enabled flag
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/featured-posts/trending',
        handler: 'featured-articles.findTrending',
        config: {
          auth: { enabled: false }, // Fixed: object format with enabled flag
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/featured-posts/latest',
        handler: 'featured-articles.findLatest',
        config: {
          auth: { enabled: false }, // Fixed: object format with enabled flag
          policies: [],
          middlewares: [],
        },
      },
    ],
  };