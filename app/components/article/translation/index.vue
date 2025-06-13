<script setup lang="ts">
defineProps<{
  text: string
  url?: string
  authors?: string[]
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-center">
        <div class="font-semibold">
          Este artículo es una traducción
        </div>
        <UTooltip v-if="url" text="Ir al artículo original">
          <UButton
            :href="url"
            target="_blank"
            color="primary"
            variant="link"
            size="sm"
          >
            <UIcon name="i-lucide-square-arrow-up-right" class="size-6" />
          </UButton>
        </UTooltip>
      </div>
    </template>
    {{ text }}
    <!-- <template v-if="by" #footer>
      <div class="text-right text-sm text-muted">
        Traducido por <UTooltip text="Ver más artículos de este autor">
          <NuxtLink
            :to="`/autors/${by}`"
            class="capitalize font-semibold text-primary hover:underline"
            :aria-label="`Ver más artículos de ${by}`"
          >
            {{ by }}
          </NuxtLink>
        </UTooltip>
      </div>
    </template> -->
  </UCard>
</template>
