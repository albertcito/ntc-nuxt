<script setup lang="ts">
import dayjs from 'dayjs'
import { kebabCase } from 'scule'
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
    <UPageHeader>
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>

      <template #title>
        {{ page.title }}
      </template>

      <template #description>
        <div v-if="page.date">
          {{ dayjs(page.date).format('MMMM D, YYYY') }}
        </div>

        <MDC
          v-if="page.description"
          :value="page.description"
          unwrap="p"
          :cache-key="`${kebabCase(route.path)}-description`"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <figure v-if="page.image" class="mb-4">
        <div class="relative">
          <img
            :src="`/img/posts/${page.image.src}`"
            :alt="page.image.alt"
            class="w-full rounded-lg object-cover object-center"
          >
          <a
            v-if="page.image.link"
            :href="page.image.link"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute bottom-0 right-2"
            title="Creditos de la imagen"
            aria-label="Creditos de la imagen"
          >
            <span class="sr-only">Creditos de la imagen</span>
            <UIcon name="i-lucide-info" class="pt-1" />
          </a>
        </div>
        <figcaption class="text-sm text-neutral-500 text-right">
          <span>
            {{ page.image.alt }}
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
    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" class="z-[2]" />
    </template>
  </UPage>
</template>
