/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#fcf8eb',
        'moss-deep': '#abc9b6',
        forest: '#abc9b6',
        vivid: '#abc9b6',
        bright: '#abc9b6',
        prune: '#811453', // Couleur prune profond, élégant et artistique
        gray: {
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      fontFamily: {
        title: ['"Caveat Brush"', 'cursive'],
        body: ['"Lato Light"', '"Lato"', 'sans-serif'],
      },
      animation: {
        'grow': 'grow 2s ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
