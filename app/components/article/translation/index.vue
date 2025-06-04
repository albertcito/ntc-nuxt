<script setup lang="ts">
defineProps<{
  text: string
  url: string
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-center">
        <div class="font-semibold">
          Este artículo es una traducción
        </div>
        <UTooltip text="Ir al artículo original">
          <UButton
            :href="url"
            target="_blank"
            color="neutral"
            variant="link"
            size="sm"
          >
            <UIcon name="i-lucide-square-arrow-up-right" class="size-6" />
          </UButton>
        </UTooltip>
      </div>
    </template>
    <p>
      {{ text }}
    </p>
  </UCard>
</template>
