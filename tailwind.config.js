const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/views/**/*.blade.php', './src/**/*.php'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                danger: colors.rose,
                primary: colors.sky,
                success: colors.green,
                warning: colors.yellow,
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
