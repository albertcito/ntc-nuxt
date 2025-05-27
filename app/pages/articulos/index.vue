<script setup lang="ts">
import { isValidInteger } from '~/util/getIntegerOrDefault'

// @ts-expect-error yaml is not typed

import page from '.index.yml'

useHead({ title: page.title })

const route = useRoute()
const valid = computed(() => isValidInteger(route.query.page))
if (!valid.value.isValid) {
  navigateTo('/articulos', { replace: true })
}
const pageNumber = computed(() => (valid.value.isValid ? valid.value.value : 1))
</script>

<template>
  <Articles
    v-model:page="pageNumber"
    path="/articulos"
    image-path="/img/posts"
    :items-per-page="6"
  />
</template>
