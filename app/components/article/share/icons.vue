<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { HTMLAttributes } from 'vue'

const { url, text } = defineProps<{
  text: string
  url: string
  hideLabel?: boolean
  iconClass?: HTMLAttributes['class']
  tooltip?: boolean
}>()

const copied = ref(false)
function onCopy() {
  navigator.clipboard.writeText(url)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}
type BtnProps = ButtonProps & { ariaLabel: string }
const items = computed<BtnProps[]>(() => [
  {
    href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    target: '_blank',
    color: 'neutral',
    variant: 'link',
    size: 'md',
    icon: 'i-lucide-facebook',
    label: 'Facebook',
    ariaLabel: 'Compartir en Facebook'
  },
  {
    href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
    target: '_blank',
    color: 'neutral',
    variant: 'link',
    size: 'md',
    icon: 'i-lucide-linkedin',
    label: 'Linkedin',
    ariaLabel: 'Compartir en Linkedin'
  },
  {
    href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    target: '_blank',
    color: 'neutral',
    variant: 'link',
    size: 'md',
    icon: 'i-lucide-twitter',
    label: 'En X',
    ariaLabel: 'Compartir en X'
  },
  {
    href: `mailto:?Subject=${text}&Body=Mira%20este%20artículo%20de%20${text}%21%0A${url}`,
    target: '_blank',
    color: 'neutral',
    variant: 'link',
    size: 'md',
    icon: 'i-lucide-mail',
    label: 'Email',
    ariaLabel: 'Enviar por Email'
  },
  {
    color: 'neutral',
    variant: 'link',
    size: 'md',
    icon: copied.value ? 'i-lucide-copy-check' : 'i-lucide-copy',
    label: copied.value ? 'Copiado' : 'Copiar',
    onClick: onCopy,
    ui: { leadingIcon: copied.value ? 'text-success' : '' },
    ariaLabel: 'Copia al portapeles'
  }
])
</script>

<template>
  <template v-if="tooltip">
    <UTooltip
      v-for="item in items"
      :key="item.label"
      :text="item.ariaLabel"
    >
      <UButton
        :color="item.color"
        :variant="item.variant"
        :size="item.size"
        :icon="item.icon"
        :label="hideLabel ? '' : item.label"
        :href="item.href"
        :target="item.target"
        :ui="item.ui"
        :aria-label="item.ariaLabel"
        :class="[iconClass, 'cursor-pointer']"
        @click="item.onClick"
      />
    </UTooltip>
  </template>
  <template v-else>
    <UButton
      v-for="item in items"
      :key="item.label"
      :color="item.color"
      :variant="item.variant"
      :size="item.size"
      :icon="item.icon"
      :label="hideLabel ? '' : item.label"
      :href="item.href"
      :target="item.target"
      :ui="item.ui"
      :aria-label="item.ariaLabel"
      :class="[iconClass, 'cursor-pointer']"
      @click="item.onClick"
    />
  </template>
</template>
