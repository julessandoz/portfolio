// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxt/image"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://localhost:3000/api",
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined' 
        }
      ]
    },
  }
})