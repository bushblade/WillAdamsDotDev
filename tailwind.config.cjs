/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        fira: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'forest',
      // {
      //   mytheme: {
      //     primary: '#c0d3f9',
      //     secondary: '#2696a5',
      //     accent: '#e0a372',
      //     neutral: '#2A182A',
      //     'base-100': '#2F394B',
      //     info: '#78A6E2',
      //     success: '#158A41',
      //     warning: '#EACD39',
      //     error: '#E92F58',
      //   },
      // },
    ],
  },
}
