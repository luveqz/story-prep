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
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :class="`${disabled ? 'disabled' : variant}-btn ${size}-btn`"
    class="whitespace-nowrap rounded-md px-4 py-2 font-londrina font-light leading-7 tracking-wide shadow-[0px_4px_0px_0px_--tw-shadow] hover:brightness-110 active:translate-y-1 active:shadow-[0px_4px_0px_0px_--tw-shadow]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
