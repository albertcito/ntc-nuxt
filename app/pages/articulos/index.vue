<script setup lang="ts">
import { isValidInteger } from '~/util/getIntegerOrDefault'

// @ts-expect-error yaml is not typed
import page from '.index.yml'
import { useArticles } from '~/components/articles/useArticles'

useHead({ title: page.seo.title })

const route = useRoute()
const valid = computed(() => isValidInteger(route.query.page))
if (!valid.value.isValid && valid.value.value) {
  navigateTo('/articulos', { replace: true })
}
const pageNumber = computed(() => (valid.value.isValid ? valid.value.value : 1))
const { articles, total } = await useArticles({
  page,
  itemsPerPage: computed(() => 6),
  type: computed(() => ['article', 'series'])
})
</script>

<template>
  <Articles
    v-model:page="pageNumber"
    :title="page.title"
    path="/articulos"
    :items-per-page="6"
    :total="total ?? 0"
    :articles="articles.data.value ?? []"
  />
</template>
