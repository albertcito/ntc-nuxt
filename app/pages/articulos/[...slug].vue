<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils'
import { getConfig } from '~/config/constants'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('articulos').path(route.path).first()
)
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(({ icon, ...link }) => link))
const env = getConfig(useRuntimeConfig())
</script>

<template>
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
              :url="`${env.siteUrl}${route.path}`"
              :text="page.title"
              hide-label
              tooltip
            />
          </div>
          <div class="flex gap-2 items-center">
            <span class="text-sm font-semibold">
              Tags
            </span>
            <UBadge
              v-for="tag in page.tags"
              :key="tag"
              :label="tag.replaceAll('-', ' ')"
              variant="outline"
              color="neutral"
              class="capitalize"
            />
          </div>
        </div>
        <div class="hidden sm:block">
          <ArticleShareVertical
            :url="`${env.siteUrl}${route.path}`"
            :text="page.title"
          />
        </div>
      </div>
    </UPageBody>
    <template #right>
      <div>
        <UContentToc
          :links="page.body.toc?.links && page.body.toc?.links.length > 1 ? page.body.toc.links : []"
          class="z-[2]"
          highlight
          highlight-color="neutral"
          color="neutral"
        >
          <template v-if="page.tags && page.tags.length > 0" #bottom>
            <USeparator v-if="page.body.toc?.links && page.body.toc?.links.length > 1" type="dashed" />
            <div>
              <div class="group text-sm font-semibold flex-1 items-center gap-1.5 py-1.5 -mt-1.5 focus-visible:outline-primary hidden lg:flex">
                <div class="truncate">
                  Artículos relacionados
                </div>
              </div>
              <ArticleRelated
                :tags="page.tags"
                :path="route.path"
                :limit="page.body.toc?.links && page.body.toc?.links.length > 1 ? 4 : 5"
              >
                <template #default="{ items }">
                  <ArticleRelatedArticles :items="items" />
                </template>
              </ArticleRelated>
            </div>
          </template>
        </UContentToc>
      </div>
    </template>
  </UPage>
</template>
