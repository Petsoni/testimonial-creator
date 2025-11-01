module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    variants: {
        extend: {
            borderColor: ['focus-visible'],
            opacity: ['disabled'],
        }
    }
}