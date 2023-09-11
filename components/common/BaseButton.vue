<script setup lang="ts">
defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary',
  },
  size: {
    type: String as PropType<'medium' | 'big'>,
    default: 'medium',
  },
})
</script>

<template>
  <button
    :class="`${variant}-btn ${size}-btn`"
    class="whitespace-nowrap rounded-md px-4 py-2 font-londrina font-light leading-7 tracking-wide shadow-[0px_4px_0px_0px_--tw-shadow]"
  >
    <slot />
  </button>
</template>
