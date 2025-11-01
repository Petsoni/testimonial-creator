module.exports = {
    content: ["./**/*.{js,ts,jsx,tsx}"],
    variants: {
        extend: {
            borderColor: ['focus-visible'],
            opacity: ['disabled'],
        }
    }
}