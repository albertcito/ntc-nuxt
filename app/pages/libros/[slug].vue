<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils'
import { getConfig } from '~/config/constants'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const { data: page, status } = await useAsyncData(
  route.path,
  () => queryCollection('all').path(route.path).first()
)
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(({ icon, ...link }) => link))
const env = getConfig(useRuntimeConfig())

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  twitterTitle: page.value?.title,
  titleTemplate: 'No te conformes - Romanos 12:2',
  description: page.value?.description,
  ogDescription: page.value?.description,
  twitterDescription: page.value?.description,
  ogImage: page.value?.image?.src,
  twitterImage: page.value?.image?.src
})
</script>

<template>
  <template v-if="status === 'success' && !page">
    <UError
      :error="{
        statusCode: 404,
        statusMessage: 'Página no encontrada',
        message: 'La página que estás buscando no existe.'
      }"
    />
  </template>
  <Article
    v-if="page"
    :title="page.title"
    :breadcrumb="breadcrumb"
    :date="page.date"
    :authors="page.authors"
    :translation="page.translation"
    :body="page"
    :image="page.image"
    :serie="page.serie"
    :share="{
      url: `${env.siteUrl}${route.path}`,
      text: page.title
    }"
    :current-path="route.path"
    :ui="{
      image: 'sm:hidden'
    }"
    :attachments="page.attachments"
  >
    <template #aside>
      <img
        :src="page.image.src"
        :alt="page.image.alt"
        :cc="page.image.cc"
        :descr="page.image.descr"
      >
    </template>
  </Article>
</template>
