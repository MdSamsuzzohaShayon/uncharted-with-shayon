// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',  '@nuxt/image'],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:1337", // your Strapi URL
    },
  },
})