/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      colors: {
        // DaisyUI removed this colour, so adding it back
        'neutral-focus': '#0d1c17',
      },
      fontFamily: {
        fira: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
    },
  },
  // plugins: [require('@tailwindcss/typography'), require('daisyui')],
  // daisyui: {
  //   themes: ['forest'],
  // },
}
