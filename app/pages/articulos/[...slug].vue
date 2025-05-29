<script setup lang="ts">
import dayjs from 'dayjs'
import type { ContentNavigationItem } from '@nuxt/content'

import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('articulos').path(route.path).first()
)
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(({ icon, ...link }) => link))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :ui="{ root: 'border-none' }">
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>

      <template #title>
        {{ page.title }}
      </template>

      <template v-if="page.date" #description>
        {{ dayjs(page.date).format('MMMM D, YYYY') }}
      </template>
    </UPageHeader>

    <UPageBody class="mt-0">
      <figure v-if="page.image" class="mb-4">
        <div class="relative">
          <img
            :src="page.image.src.substring(0, 4) === 'http'
              ? page.image.src
              :`/img/articulos/${page.image.src}`"
            :alt="page.image.alt"
            class="w-full rounded-lg object-cover object-center"
          >
          <UButton
            v-if="page.image.cc"
            icon="i-lucide-info"
            size="sm"
            color="neutral"
            variant="soft"
            :href="page.image.cc"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute bottom-2 right-2 opacity-30 hover:opacity-100 p-0.5"
            title="Creditos de la imagen"
            aria-label="Creditos de la imagen"
          />
        </div>
        <figcaption class="text-sm text-neutral-500 text-right">
          <span>
            {{ page.image.descr }}
          </span>
        </figcaption>
      </figure>
      <UPageBody>
        <ContentRenderer
          v-if="page.body"
          :value="page"
          :prose="true"
          class="text-xl font-karma"
        />
        <USeparator />
      </UPageBody>
    </UPageBody>
    <template #right>
      <UContentToc
        v-if="page?.body?.toc?.links?.length"
        :links="page.body.toc.links"
        class="z-[2]"
      />
    </template>
  </UPage>
</template>
