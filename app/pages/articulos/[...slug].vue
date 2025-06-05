<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils'
import { ArticleCategory, ArticleHeaderBar } from '#components'

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
    <UPageHeader
      :ui="{ root: 'border-none' }"
      :title="page.title"
      :description="page.description"
    >
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>
    </UPageHeader>

    <div>
      <ArticleHeaderBar
        :date="page.date"
        :translation="page.translation"
      />
      <div
        v-if="page.image && !page.image.hide"
        :class="['bg-elevated/50 px-2', { 'pb-2': !page.image.descr }]"
      >
        <Image
          :src="page.image.src"
          :alt="page.image.alt"
          :cc="page.image.cc"
          :descr="page.image.descr"
        />
      </div>
    </div>

    <UPageBody class="space-y-0 mt-0">
      <div class="sm:flex gap-4">
        <div class="max-w-2xl flex flex-col gap-8">
          <ContentRenderer
            v-if="page.body"
            :value="page"
            :prose="true"
            class="text-xl font-karma"
          />
          <ArticleParent
            v-if="page.serie"
            :serie="page.serie"
          />
          <div class="sm:hidden flex justify-center items-center bg-(--ui-bg-muted)">
            <ArticleShareIcons
              :url="`${route.path}`"
              :text="page.title"
              hide-label
              tooltip
            />
          </div>
        </div>
        <div class="hidden sm:block">
          <ArticleShareVertical :url="`${route.path}`" :text="page.title" />
        </div>
      </div>
    </UPageBody>
    <template #right>
      <div>
        <UContentToc
          v-if="page?.body?.toc?.links?.length && page.body.toc.links.length > 1"
          :links="page.body.toc.links"
          class="z-[2]"
          highlight
          highlight-color="neutral"
          color="neutral"
        >
          <template #bottom>
            <USeparator v-if="page.body?.toc?.links?.length" type="dashed" />

            <div>
              {{ page.category ? 'Categoría: ' + page.category : '' }}
              <ArticleCategory
                v-if="page.category"
                :category="page.category"
                :tags="page.tags ?? []"
                :path="route.path"
              />
            </div>

            <USeparator type="dashed" />

            <AdsCarbon />
          </template>
        </UContentToc>
      </div>
    </template>
  </UPage>
</template>
