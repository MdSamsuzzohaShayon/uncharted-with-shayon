// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',  '@nuxt/image'],
  runtimeConfig: {
    public: {
      backendApi: '', //  can be overridden by NUXT_PUBLIC_BACKEND_API environment variable
      geoapifyApiKey: '',
      geoapifyAutocompleteUrl: '' 
    },
  },
});
