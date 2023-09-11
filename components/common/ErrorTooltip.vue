<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const { error } = useErrorTooltip()
</script>

<template>
  <div class="relative">
    <div class="cursor-pointer">
      <slot />
    </div>

    <section
      v-if="error"
      class="text-brown-500 absolute right-full top-0 z-10 mr-1.5 flex max-w-xs transform flex-col gap-3 rounded bg-brown-50 px-4 py-2 text-center"
    >
      <div class="relative text-brown-700">
        <span
          class="triangle-up absolute left-full ml-1 translate-x-full transform -scroll-mt-0.5"
        />
        <p class="w-44"> You need to first provide a valid API key. </p>
      </div>
    </section>
  </div>
</template>

<style>
.triangle-up {
  width: 0;
  height: 0;
  @apply border-b-[10px] border-b-transparent;
  @apply border-t-[10px] border-t-transparent;
  @apply border-l-[10px] border-l-brown-50;
}
</style>
