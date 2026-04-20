// /src/plugins/editorjs/admin/src/index.ts

import { PLUGIN_ID } from './pluginId';

export default {
  register(app: any) {
    // Register the custom field in the admin panel
    app.customFields.register({
      name: 'editorjs',
      pluginId: PLUGIN_ID, // Use a constant for the plugin ID
      type: 'json',
      intlLabel: {
        id: 'editorjs.label',
        defaultMessage: 'Editor.js',
      },
      intlDescription: {
        id: 'editorjs.description',
        defaultMessage: 'Rich text editor using Editor.js',
      },
      components: {
        // Use async import for better performance
        Input: async () => import('./components/Editor').then(module => ({
          default: module.default
        })),
      },
      // You can add options for the Content-Type Builder later if needed
      // options: { ... }
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    // Optional: Add internationalization for your plugin
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};