// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { name: 'page' },
    head: {
      title: 'Marwin\'s Desk',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/images/desk/journal.svg'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Patrick+Hand&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        }
      ]
    }
  }

})
