/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        'moss-deep': '#004D40',
        forest: '#00695C',
        vivid: '#4CAF50',
        bright: '#A5D6A7',
        gray: {
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      fontFamily: {
        title: ['"Caveat Brush"', 'cursive'],
        body: ['"Montserrat"', 'sans-serif'],
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
