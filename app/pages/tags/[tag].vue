<script setup lang="ts">
import { isValidInteger } from '~/util/getIntegerOrDefault'

const route = useRoute()
const valid = computed(() => isValidInteger(route.query.page))
if (!valid.value.isValid && valid.value.value) {
  navigateTo('/articulos', { replace: true })
}
const pageNumber = computed(() => (valid.value.isValid ? valid.value.value : 1))
const title = computed(() => (route.params.tag as string).replaceAll('-', ' '))

useHead({ title: `Tag: ${title.value}` })
</script>

<template>
  <ArticlesTags
    v-model:page="pageNumber"
    :path="`/tags/${route.params.tag}`"
    image-path="/img/articulos"
    :items-per-page="6"
    :title="`Tag: ${title}`"
    :tags="[route.params.tag] as string[]"
  />
</template>
