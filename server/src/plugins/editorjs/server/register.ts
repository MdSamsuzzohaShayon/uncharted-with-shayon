import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('🟢 Editor.js plugin: Registering custom field on server (TypeScript)');

  strapi.customFields.register({
    name: 'editorjs',
    plugin: 'editorjs',
    type: 'json',
  });

  console.log('✅ Editor.js custom field registered successfully (TypeScript)');
};