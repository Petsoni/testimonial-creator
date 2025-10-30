module.exports = {
    theme: {
        extend: {
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            }
        }
    },
    variants: {
        extend: {
            borderColor: ['focus-visible'],
            opacity: ['disabled'],
        }
    }
}