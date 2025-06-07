interface UseArticlesProps {
  page: Ref<number>
  itemsPerPage: Ref<number>
}

export const getArticulos = async ({ page, itemsPerPage }: UseArticlesProps) => {
  const collection = 'articulos'
  const totalSkip = computed(() => (page.value - 1) * itemsPerPage.value)
  const articles = await useAsyncData(
    computed(() => `${collection}_${page}_${itemsPerPage}`),
    () => queryCollection(collection)
      .where('type', '<>', 'subseries')
      .order('date', 'DESC')
      .skip(totalSkip.value)
      .limit(itemsPerPage.value)
      .all()
  )
  const { data: total } = await useAsyncData(
    'total',
    () => queryCollection(collection).where('type', '<>', 'subseries').count()
  )

  return {
    articles,
    total
  }
}
