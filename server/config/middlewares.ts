// path: config/middlewares.ts

export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'https://market-assets.strapi.io',
            env('R2_PUBLIC_URL'),
            'https://*.r2.dev',
            'https://*.cloudflare.com',
          ].filter(Boolean),
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            env('R2_PUBLIC_URL'),
            'https://*.r2.dev',
          ].filter(Boolean),
          'frame-src': [
            "'self'",
            'https://www.youtube.com',
            'https://player.vimeo.com',
            'https://www.google.com',
          ],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          'style-src': ["'self'", "'unsafe-inline'", 'https:'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];