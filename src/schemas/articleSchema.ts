import { z } from 'astro:content'

export const articleSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()),
  draft: z.boolean(),
})

export type ArticleSchema = z.infer<typeof articleSchema>
