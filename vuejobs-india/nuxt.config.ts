// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    databaseUrl: "",
  },
  routeRules: {
    "/docs/**":{
      ssr: false,
      
    }
  },
  modules: ["@scalar/nuxt"],
  scalar: {
    spec: {
      url: "/_openapi.json",
    },
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
       include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
      exclude: ["web-worker"],
    },
  },
});
