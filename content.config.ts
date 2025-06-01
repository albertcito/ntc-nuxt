import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articulos: defineCollection({
      type: 'page',
      source: 'articulos/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.string().min(1),
        type: z.enum(['article', 'series', 'subseries']),
        // if a article is "subseries" it should have the serie path
        serie: z.string(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        translation: z.boolean().default(false),
        image: z.object({
          src: z.string().min(1),
          alt: z.string().min(1),
          descr: z.string().optional(),
          cc: z.string().optional(),
          hide: z.boolean().default(false)
        })
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        title: z.string().min(1)
      })
    })
  }
})
