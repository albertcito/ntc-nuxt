<script setup lang="ts">
// @ts-expect-error yaml is not typed
import page from '.index.yml'
import { useArticles } from '~/components/articles/useArticles'
import HomeHeader from '~/components/homeHeader/index.vue'

useHead({ title: page.title })

const { articles: data } = await useArticles({
  page: computed(() => 1),
  itemsPerPage: computed(() => 7),
  type: computed(() => ['article', 'series'])
})

const first = computed(() => data.data.value?.[0])
const second = data.data.value?.slice(1, 7) || []
</script>

<template>
  <UMain class="flex flex-col gap-8 py-8 items-center justify-center">
    <HomeHeader />
    <UBlogPost
      v-if="first"
      :title="first.title"
      :date="first.date"
      :description="first.description"
      :to="first.path"
      :image="first.image.src"
      orientation="horizontal"
      :ui="{
        description: 'mt-2 pr-4 text-lg'
      }"
    />
    <UBlogPosts class="lg:gap-y-8">
      <UBlogPost
        v-for="(post, index) in second"
        :key="index"
        :title="post.title"
        :date="post.date"
        :to="post.path"
        :image="post.image.src"
      />
    </UBlogPosts>
  </UMain>
</template>
