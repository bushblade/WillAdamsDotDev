import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import { h } from 'hastscript'
import AnchorIcon from './src/icons/anchor'

import tailwind from '@astrojs/tailwind'

export default defineConfig({
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
          content: (heading) => [
            h(
              `span.anchor-icon`,
              {
                ariaHidden: 'true',
              },
              AnchorIcon
            ),
          ],
        },
      ],
    ],
  },
  integrations: [tailwind()],
})
