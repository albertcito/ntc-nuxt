<script setup lang="ts">
import { getArticulos, type GetArticlesResult } from './getArticles'

const props = defineProps<{
  title?: string
  path: string
  imagePath: string
  itemsPerPage: number
  tags: string[]
}>()

const page = defineModel<number>('page', { required: true })
const data = reactive<GetArticlesResult>({} as GetArticlesResult)
watch([page, () => props.tags, () => props.itemsPerPage], async () => {
  const values = await getArticulos({
    page,
    itemsPerPage: computed(() => props.itemsPerPage),
    tags: computed(() => props.tags)
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.articles = values.articles as any
  data.total = values.total.value ?? 0
  data.totalSkip = values.totalSkip.value ?? 0
}, { immediate: true })
</script>

<template>
  <ArticlesAll
    v-model:page="page"
    :title="title"
    :path="path"
    :image-path="imagePath"
    :items-per-page="itemsPerPage"
    :total="data.total ?? 0"
    :articles="data.articles?.data ?? []"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
  </ArticlesAll>
</template>
