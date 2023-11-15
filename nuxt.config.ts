// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  modules: ["@nuxt/image", "nuxt-security"],
  security: {
    headers: {
      contentSecurityPolicy: {
        'connect-src': [
          'self',
          process.env.ALLOWED_DOMAIN_1 || "",
          process.env.ALLOWED_DOMAIN_2 || "",
          process.env.ALLOWED_DOMAIN_3 || "",
        ],
      },
    },
  },
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
