import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articulos: defineCollection({
      type: 'page',
      source: 'articulos/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.string().min(1),
        type: z.enum(['blog', 'book', 'page']),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.object({
          src: z.string().min(1),
          alt: z.string().min(1),
          link: z.string().optional()
        })
      })
    })
  }
})
