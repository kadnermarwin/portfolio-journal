/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#b59e63", // Muted Gold/Tan
                "accent-orange": "#d97706", // Burnt Orange
                "leather-brown": "#5e3e24", // Rich leather
                "paper-cream": "#fdfbf7", // Creamy off-white
                "background-light": "#f7f7f6",
                "background-dark": "#1d1b15",
                "notebook-yellow": "#fdf6e3", // Classic Light Yellow Notebook
            },
            fontFamily: {
                "heading": ["'Gloria Hallelujah'", "cursive"],
                "body": ["'Patrick Hand'", "cursive"],
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
