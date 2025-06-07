<script setup lang="ts">
import type { PageHeaderProps } from '@nuxt/ui-pro'

interface ArticulosCollectionItem {
  title: string
  path: string
  image: {
    src: string
  }
  type: 'article' | 'series' | 'subseries'
}

defineProps<{
  title?: string
  path: string
  imagePath: string
  itemsPerPage: number
  total: number
  articles: ArticulosCollectionItem[]
  uiPageHeader?: PageHeaderProps['ui']
}>()
const page = defineModel<number>('page', { required: true })
</script>

<template>
  <UPage>
    <UPageHeader :ui="uiPageHeader">
      <template #title>
        <slot name="title">
          {{ title }}
        </slot>
      </template>
      <template #links>
        <div class="flex justify-between items-center gap-2">
          <div class="opacity-50 text-xs">
            {{ articles.length }} de {{ total }} artículos
          </div>
          <UPagination
            v-if="total"
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total="total"
            :show-controls="false"
            show-edges
            :sibling-count="1"
            size="sm"
            :to="(pageSelected) => ({
              path,
              query: { page: pageSelected }
            })"
            variant="ghost"
          />
        </div>
      </template>
    </UPageHeader>
    <UMain class="flex flex-col gap-8 py-8 items-center ">
      <UBlogPosts class="lg:gap-y-8">
        <UBlogPost
          v-for="(post, index) in articles"
          :key="index"
          v-bind="post"
          :to="post.path"
          :image="post.image.src.substring(0, 4) === 'http' ? post.image.src : `${imagePath}/${post.image.src}`"
          :badge="post.type === 'series' ? 'Serie' : undefined"
        />
      </UBlogPosts>
      <UPagination
        v-if="total"
        v-model:page="page"
        :items-per-page="itemsPerPage"
        show-edges
        :sibling-count="1"
        :total="total"
        :to="(pageSelected) => ({
          path,
          query: { page: pageSelected }
        })"
      />
    </UMain>
  </UPage>
</template>
