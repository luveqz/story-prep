<script setup lang="ts">
import { type LessonEntry } from '@/lib/schemas'

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
    <HeadingTwo class="mb-2 text-center sm:mb-6">{{ title }}</HeadingTwo>

    <div class="flex flex-col gap-y-8">
      <article
        v-for="(entry, id) in entries"
        :key="id"
        class="flex flex-col gap-5 sm:flex-row"
      >
        <!-- Definition -->
        <div class="w-full shrink-0 sm:w-56">
          <span
            class="inline-block rounded-md px-2 py-1 font-londrina text-xl"
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
            v-for="(example, id) in entry.examples"
            :key="id"
            class="ml-5 flex gap-x-3 sm:ml-0"
          >
            <figure
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8"
              :class="colorClass"
            >
              <QuoteIcon class="h-4 w-4 sm:h-auto sm:w-auto" />
            </figure>

            <span class="sm:mt-0.5">
              {{ example }}
            </span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
