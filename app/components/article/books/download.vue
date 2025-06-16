<script setup lang="ts">
interface DecargarBoxProps {
  title: string
  url: string
}

defineProps<DecargarBoxProps>()
</script>

<template>
  <UCard>
    <template #header>
      {{ title }}
    </template>
    <div class="mt-2 mb-4 flex-1">
      <slot />
    </div>
    <template #footer>
      <div class="text-right">
        <UButton
          :href="url"
          target="_blank"
          rel="noreferrer"
          variant="outline"
          color="neutral"
        >
          Descargar aquí
        </UButton>
      </div>
    </template>
  </UCard>
</template>
