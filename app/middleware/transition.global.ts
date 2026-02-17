export default defineNuxtRouteMiddleware((to, from) => {
    // Disable transition for book flipping (staying within book context)
    // We assume / and /read/* are book routes
    const isBookRoute = (path: string) => path === '/' || path.startsWith('/read/');

    if (isBookRoute(to.path) && isBookRoute(from.path)) {
        to.meta.pageTransition = false
        from.meta.pageTransition = false
        return
    }

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
