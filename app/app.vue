<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('articulos'))
provide('navigation', navigation)

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('articulos'), { server: false })
const route = useRoute()
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Artículos',
    to: '/articulos',
    active: route.path.startsWith('/articulos')
  },
  {
    label: 'Libros',
    to: '/libros',
    active: route.path.startsWith('/libros')
  },
  {
    label: 'Acerca de',
    to: '/acerca-de',
    active: route.path.startsWith('/acerca-de')
  }
])
</script>

<template>
  <UApp>
    <UHeader :ui="{ left: 'min-w-0' }" :menu="{ shouldScaleBackground: true }">
      <template #title>
        <NuxtLink
          to="/"
          class="font-bold text-2xl text-primary font-karma"
          aria-label="No te conformes"
        >
          No te conformes
        </NuxtLink>
      </template>
      <UNavigationMenu :items="items" />
      <template #right>
        <ThemePicker />
        <UTooltip text="Search" :kbds="['meta', 'K']">
          <UContentSearchButton />
        </UTooltip>
      </template>
      <template #body>
        <UContentNavigation
          v-if="navigation"
          :navigation="navigation"
          highlight
          :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
        >
          <template #link-title="{ link }">
            <span class="inline-flex items-center gap-0.5">
              {{ link.title }}

              <sup v-if="link.module === 'ui-pro'" class="text-[8px] font-medium text-primary">PRO</sup>
            </span>
          </template>
        </UContentNavigation>
      </template>
    </UHeader>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <USeparator class="h-px" />
    <UFooter>
      © 2025 - No te Conformes
    </UFooter>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 100 }"
      />
    </ClientOnly>
  </UApp>
</template>
