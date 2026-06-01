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
    }
  ],
};