import { defineCollection } from 'astro:content'
import { articleSchema } from '../schemas/articleSchema'

const articlesCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: articleSchema,
})

export const collections = {
  articles: articlesCollection,
}
