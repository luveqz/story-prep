<script setup lang="ts">
import { getAdaptedLesson } from '@/lib/adapters'

const { $app, $modal } = useNuxtApp()

const { data, error, execute, pending } = await useAsyncData(
  $app.generateLesson,
  { immediate: false },
)

watch(pending, () => {
  if (!pending.value) {
    const lesson = getAdaptedLesson(data.value)

    if (lesson) {
      $app.lesson = lesson
      $modal.open('lesson-sheet')
    }
  }
})

const errorMessage = computed(
  () => error.value && (error.value as any)?.data?.error.message,
)
</script>

<template>
  <form
    class="grow rounded-md bg-brown-700 p-8 sm:max-w-[40rem]"
    @submit.prevent="execute()"
  >
    <HeadingTwo>Paste your story</HeadingTwo>

    <BaseTextarea
      v-model="$app.story"
      class="my-4 min-h-[20rem] w-full sm:my-5"
    />

    <div class="flex justify-between gap-x-8">
      <div>
        <p v-if="error" class="text-pink-400">
          {{ errorMessage }}
        </p>
      </div>
      <BaseButton> Generate Lesson </BaseButton>
    </div>
  </form>
</template>
