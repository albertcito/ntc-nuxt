<script setup lang="ts">
import { useArticles } from './useArticles'

const props = defineProps<{
  title?: string
  path: string
  imagePath: string
  itemsPerPage: number
  tags: string[]
}>()

const page = defineModel<number>('page', { required: true })

const { articles, total } = await useArticles({
  page,
  itemsPerPage: computed(() => props.itemsPerPage),
  tags: computed(() => props.tags)
})
</script>

<template>
  <template v-if="!tags.length || (articles?.status.value === 'success' && !articles?.data?.value?.length)">
    <UError
      :error="{
        statusCode: 404,
        statusMessage: 'Página no encontrada',
        message: 'La página que estás buscando no existe.'
      }"
    />
  </template>
  <ArticlesAll
    v-else
    v-model:page="page"
    :title="title"
    :path="path"
    :image-path="imagePath"
    :items-per-page="itemsPerPage"
    :total="total ?? 0"
    :articles="articles?.data.value ?? []"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
  </ArticlesAll>
</template>
