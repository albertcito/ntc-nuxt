<script setup lang="ts">
const {
  path,
  tags,
  limit
} = defineProps<{ tags: string[], path: string, limit: number }>()

const { data } = await useAsyncData(
  computed(() => `articulos-${JSON.stringify(tags)}`),
  () => {
    const query = queryCollection('articulos')
      .where('type', '<>', 'subseries')
      .where('path', '<>', path)
      .order('date', 'DESC')
      .limit(limit)

    if (tags.length) {
      query.orWhere((q) => {
        tags.forEach(tag => q.where('tags', 'LIKE', `%${tag}%`))
        return q
      })
    }

    return query.all()
  }
)
</script>

<template>
  <slot v-if="data && data.length > 0" :items="data" />
</template>
