<script setup lang="ts">
const { serie } = defineProps<{
  serie: string
}>()

const path = computed(() => `/articulos/${serie}`)

const { data: page } = await useAsyncData(
  path,
  () => queryCollection('articulos').path(path.value).first()
)
</script>

<template>
  <div v-if="page">
    This post is parte of the serie <UButton :to="path" variant="link">
      {{ page.title }}
    </UButton>
  </div>
</template>
