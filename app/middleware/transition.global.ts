export default defineNuxtRouteMiddleware((to, from) => {
    // Check if we are going to the home page (Backwards / Closing)
    if (to.path === '/') {
        to.meta.pageTransition = { name: 'page-left' }
        from.meta.pageTransition = { name: 'page-left' }
    } else {
        // Otherwise we are opening a page (Forwards / Opening)
        to.meta.pageTransition = { name: 'page-right' }
        from.meta.pageTransition = { name: 'page-right' }
    }
})
