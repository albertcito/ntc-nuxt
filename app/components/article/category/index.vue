<script setup lang="ts">
const {
  category,
  path,
  tags
} = defineProps<{ category: string, tags: string[], path: string }>()

const { data } = await useAsyncData(
  computed(() => `articulos-${JSON.stringify(tags)}`),
  () => {
    const query = queryCollection('articulos')
      .where('type', '<>', 'subseries')
      .where('path', '<>', path)
      .order('date', 'DESC')
      .limit(5)

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
  <div v-if="data && data.length > 0" class="flex flex-col gap-4">
    <div
      v-for="item in data"
      :key="item.path"
    >
      {{ item.title }}
    </div>
  </div>
</template>
