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
    :description="page?.description"
    :breadcrumb="breadcrumb"
    :date="page.date"
    :authors="page.authors"
    :translation="page.translation"
    :image="page.image"
    :body="page"
    :toc-links="page.body.toc?.links"
    :serie="page.serie"
    :share="{
      url: `${env.siteUrl}${route.path}`,
      text: page.title
    }"
    :tags="page.tags"
    :current-path="route.path"
  />
</template>
