<script setup lang="ts">
const props = defineProps<{
  serie: string
}>()

const { data } = await useAsyncData(
  computed(() => `${props.serie}`),
  () => queryCollection('articulos')
    .where('type', '=', 'subseries')
    .where('serie', '=', props.serie)
    .order('date', 'ASC')
    .all()
)
</script>

<template>
  <UBlogPost
    v-for="(post, index) in data"
    :key="index"
    :to="post.path"
    :title="post.title"
    orientation="horizontal"
  />
</template>
