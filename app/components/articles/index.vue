<script setup lang="ts">
import { useArticles } from './useArticles'

const props = defineProps<{
  title: string
  path: string
  imagePath: string
  itemsPerPage: number
}>()

const page = defineModel<number>('page', { required: true })

const { articles, total } = await useArticles({
  page,
  itemsPerPage: computed(() => props.itemsPerPage)
})
</script>

<template>
  <ArticlesAll
    v-model:page="page"
    :title="title"
    :path="path"
    :image-path="imagePath"
    :items-per-page="itemsPerPage"
    :total="total ?? 0"
    :articles="articles.data.value ?? []"
  />
</template>
