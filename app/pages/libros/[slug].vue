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
const breadcrumb = computed(() => mapContentNavigation(
  findPageBreadcrumb(navigation?.value, page.value)
).map(({ icon, ...link }) => link))

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
  <UPage
    v-if="page"
    :ui="{
      center: 'lg:col-span-7',
      right: 'lg:col-span-3'
    }"
  >
    <UPageHeader
      :ui="{ root: 'border-none' }"
      :title="page.title"
    >
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>
      <template #description>
        hola
      </template>
    </UPageHeader>

    <UPageBody class="space-y-0 mt-0">
      <div class="sm:flex gap-4">
        <div class="max-w-2xl flex flex-col gap-8">
          <ContentRenderer
            v-if="page.body"
            :value="page"
            :prose="true"
            class="text-xl font-karma wrap-anywhere"
          />
          <div class="sm:hidden flex justify-center items-center bg-(--ui-bg-muted)">
            <ArticleShareIcons
              :url="`${env.siteUrl}${route.path}`"
              :text="page.title"
              hide-label
              tooltip
            />
          </div>
        </div>
        <div class="hidden sm:block print:hidden">
          <ArticleShareVertical
            :url="`${env.siteUrl}${route.path}`"
            :text="page.title"
          />
        </div>
      </div>
    </UPageBody>
    <template #right>
      <div>
        <div>
          <div>
            <img
              :src="page.image.src"
              :alt="page.image.alt"
            >
          </div>
        </div>
      </div>
    </template>
  </UPage>
</template>
