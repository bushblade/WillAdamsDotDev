import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import { h } from 'hastscript'
import AnchorIcon from './src/icons/anchor'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  experimental: {
    contentIntellisense: true,
  },

  prefetch: true,

  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: () => [
            h(
              `span.anchor-icon`,
              {
                ariaHidden: 'true',
                dataTip: 'Direct link',
              },
              AnchorIcon
            ),
          ],
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
