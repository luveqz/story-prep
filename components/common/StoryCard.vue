<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <BaseCard class="flex gap-x-4 p-4">
    <section class="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
      <img
        :src="imageUrl"
        alt=" Author's picture"
        class="min-h-full min-w-full object-cover"
      />

      <div
        class="absolute left-0 top-0 h-full w-full bg-orange-300 opacity-50 mix-blend-multiply"
      />
    </section>
    <section>
      <h3 class="font-londrina text-xl leading-6">{{ title }}</h3>
      <p class="mt-0.5 text-sm opacity-60">by {{ author }}</p>
    </section>
  </BaseCard>
</template>
