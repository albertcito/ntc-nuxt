<script setup lang="ts">
import { isValidInteger } from '~/util/getIntegerOrDefault'

const route = useRoute()
const valid = computed(() => isValidInteger(route.query.page))
const tag = computed(() => `${route.params.tag}`)
if (!valid.value.isValid && valid.value.value) {
  navigateTo(`/tags/${route.params.tag}`, { replace: true })
}
const pageNumber = computed(() => (valid.value.isValid ? valid.value.value : 1))
const title = computed(() => (tag.value).replaceAll('-', ' '))

useHead({ title: `Tag: ${title.value}` })
</script>

<template>
  <ArticlesTags
    v-model:page="pageNumber"
    :path="`/tags/${tag}`"
    image-path="/img/articulos"
    :items-per-page="6"
    :tags="[tag]"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <div class="capitalize">
          {{ title }}
        </div>
        <UBadge color="neutral" variant="outline" class="capitalize">
          Tag
        </UBadge>
      </div>
    </template>
  </ArticlesTags>
</template>
