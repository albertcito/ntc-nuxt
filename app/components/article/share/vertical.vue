<script setup lang="ts">
defineProps<{
  text: string
  url: string
}>()
</script>

<template>
  <div class="flex justify-end sticky top-16 lg:top-24 p-4">
    <div class="flex flex-col divide-y divide-(--ui-border-muted)">
      <ArticleShareIcons
        :text="text"
        :url="url"
        :icon-class="[
          'rounded-none',
          'uppercase w-30 py-3',
          'opacity-50 hover:opacity-100 transition-opacity'
        ]"
      />
    </div>
  </div>
</template>
