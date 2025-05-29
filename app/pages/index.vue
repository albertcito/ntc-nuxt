<script setup lang="ts">
// @ts-expect-error yaml is not typed
import page from '.index.yml'
import HomeHeader from '~/components/homeHeader/index.vue'

useHead({ title: page.title })

const { data } = await useAsyncData(
  'today',
  () => queryCollection('articulos').order('date', 'DESC').limit(7).all()
)
const second = data.value?.slice(1, 7) || []
</script>

<template>
  <UMain class="flex flex-col gap-8 py-8 items-center justify-center">
    <HomeHeader />
    <UBlogPost
      v-if="data && data.length > 0 && data[0]"
      v-bind="data[0]"
      :to="data[0].path"
      :image="data[0].image ? `/img/articulos/${data[0].image.src}` : undefined"
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
        :image="post.image ? `/img/articulos/${post.image.src}` : undefined"
      />
    </UBlogPosts>
  </UMain>
</template>
