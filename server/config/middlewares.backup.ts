import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  // Add your custom upload middleware at the end
  {
    name: 'global::upload-folder',
    config: {
      // You can add configuration options here if needed
      // folders: {
      //   featured_image: 'articles',
      //   gallery: 'gallery',
      //   cover_image: 'locations',
      //   default: 'others'
      // }
    }
  }
];

export default config;
