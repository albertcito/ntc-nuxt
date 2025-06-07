interface UseArticlesProps {
  page: Ref<number>
  itemsPerPage: Ref<number>
  tags?: Ref<string[]>
}

export const getArticulos = async ({ page, itemsPerPage, tags }: UseArticlesProps) => {
  const collection = 'articulos'
  const totalSkip = computed(() => (page.value - 1) * itemsPerPage.value)
  const articles = await useAsyncData(
    computed(() => `${collection}_${page}_${itemsPerPage}`),
    () => {
      const query = queryCollection(collection)
        .where('type', '<>', 'subseries')
        .order('date', 'DESC')
        .skip(totalSkip.value)
        .limit(itemsPerPage.value)

      if (tags?.value.length) {
        query.orWhere((subQuery) => {
          for (const tag of tags.value) {
            subQuery.where('tags', 'LIKE', `%${tag}%`)
          }
          return subQuery
        })
      }

      return query.all()
    }
  )
  const { data: total } = await useAsyncData(
    'total',
    () => {
      const query = queryCollection(collection).where('type', '<>', 'subseries')
      if (tags?.value.length) {
        query.orWhere((subQuery) => {
          for (const tag of tags.value) {
            subQuery.where('tags', 'LIKE', `%${tag}%`)
          }
          return subQuery
        })
      }
      return query.count()
    }
  )

  return {
    articles,
    total,
    totalSkip
  }
}

export type GetArticlesResult = Awaited<ReturnType<typeof getArticulos>>

export const useArticles = async ({ page, itemsPerPage, tags }: UseArticlesProps) => {
  const tagsString = computed(() => tags?.value.join(',') ?? '')
  const collection = 'articulos'
  const totalSkip = computed(() => (page.value - 1) * itemsPerPage.value)
  const articles = await useAsyncData(
    computed(() => `${collection}_${tagsString.value}_${page.value}_${totalSkip.value}_${itemsPerPage.value}`),
    () => {
      const query = queryCollection(collection)
        .where('type', '<>', 'subseries')
        .order('date', 'DESC')
        .skip(totalSkip.value)
        .limit(itemsPerPage.value)

      if (tags?.value.length) {
        query.orWhere((subQuery) => {
          for (const tag of tags.value) {
            subQuery.where('tags', 'LIKE', `%${tag}%`)
          }
          return subQuery
        })
      }

      return query.all()
    }
  )
  const { data: total } = await useAsyncData(
    computed(() => `total_${collection}_${tagsString.value}`),
    () => {
      const query = queryCollection(collection).where('type', '<>', 'subseries')
      if (tags?.value.length) {
        query.orWhere((subQuery) => {
          for (const tag of tags.value) {
            subQuery.where('tags', 'LIKE', `%${tag}%`)
          }
          return subQuery
        })
      }
      return query.count()
    }
  )

  return {
    articles,
    total,
    totalSkip
  }
}
