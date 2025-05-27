<script setup lang="ts">
// @ts-expect-error yaml is not typed
import page from '.index.yml'
import getRandomImage from '~/util/getRandomImage'

useHead({ title: page.title })

const { data } = await useAsyncData(
  'today',
  () => queryCollection('articulos').order('date', 'DESC').limit(7).all()
)
const image = getRandomImage()
const second = data.value?.slice(1, 7) || []
</script>

<template>
  <UMain class="flex flex-col gap-8 py-8 items-center justify-center">
    <UPageCTA
      :title="page.hero.title"
      variant="naked"
      class="bg-black text-white"
      :ui="{
        title: 'text-white font-karma',
        description: 'text-white',
        container: 'py-6 sm:px-6 sm:py-6 lg:py-6'
      }"
    >
      <template #description>
        <p class="font-karma">
          {{ page.hero.description }}
        </p>
        <p class="font-semibold mt-2 font-karma">
          {{ page.hero.verse }}
        </p>
      </template>
      <img
        :src="image?.src"
        alt=""
        class="absolute inset-0 object-cover w-full h-full -z-10 opacity-40"
      >
    </UPageCTA>
    <UBlogPost
      v-if="data && data.length > 0 && data[0]"
      v-bind="data[0]"
      :to="data[0].path"
      :image="data[0].image ? `/img/posts/${data[0].image.src}` : undefined"
      orientation="horizontal"
    />
    <UBlogPosts class="lg:gap-y-8">
      <UBlogPost
        v-for="(post, index) in second"
        :key="index"
        :title="post.title"
        :date="post.date"
        :to="post.path"
        :image="post.image ? `/img/posts/${post.image.src}` : undefined"
      />
    </UBlogPosts>
  </UMain>
</template>
