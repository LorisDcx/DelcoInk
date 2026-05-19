/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#fcf8eb',
        'moss-deep': '#abc9b6',
        forest: '#abc9b6',
        vivid: '#abc9b6',
        bright: '#abc9b6',
        prune: '#811453',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      fontFamily: {
        title: ['"Caveat Brush"', 'cursive'],
        body: ['"Lato"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        satisfy: ['"Satisfy"', 'cursive']
      },
      animation: {
        'grow': 'grow 2s ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slideUp': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
