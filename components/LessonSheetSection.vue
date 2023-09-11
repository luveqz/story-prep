<script setup lang="ts">
import { LessonEntry } from '@/lib/schemas'

defineProps({
  title: {
    type: String,
    required: true,
  },
  colorClass: {
    type: String,
    required: true,
  },
  entries: {
    type: Object as PropType<LessonEntry[]>,
    required: true,
  },
})
</script>

<template>
  <section>
    <HeadingTwo class="mb-6 text-center">{{ title }}</HeadingTwo>

    <div class="flex flex-col gap-y-8">
      <article v-for="(entry, id) in entries" :key="id" class="flex gap-x-5">
        <!-- Definition -->
        <div class="w-56 shrink-0">
          <span
            class="inline-block rounded-md p-2 font-londrina text-xl"
            :class="colorClass"
          >
            {{ entry.entry }}
          </span>

          <p class="mt-2">
            {{ entry.definition }}
          </p>
        </div>

        <!-- Examples -->
        <ul class="flex grow flex-col gap-y-3">
          <li
            v-for="(example, id) in entry.example"
            :key="id"
            class="flex gap-x-3"
          >
            <figure
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              :class="colorClass"
            >
              <QuoteIcon />
            </figure>

            <span class="mt-0.5">
              {{ example }}
            </span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
