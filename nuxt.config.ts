import yaml from '@rollup/plugin-yaml'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/google-fonts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',
  vite: {
    plugins: [
      yaml()
    ]
  },
  typescript: {
    typeCheck: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  googleFonts: {
    families: {
      'Roboto': true,
      'Source Sans 3': [300, 400, 500, 600, 700],
      'Alkatra': true,
      'JetBrains Mono': true,
      'Material Symbols Outlined': true,
      'Karma': [300, 400, 500, 600, 700],
      'Inter': [300, 400, 500, 600, 700]
    }
  }
})
