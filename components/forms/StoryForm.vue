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
      $app.lesson = {
        title: $app.story.title,
        author: $app.story.author,
        content: lesson,
      }
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

    <div
      class="mt-4 flex flex-col justify-stretch gap-4 sm:mt-5 sm:flex-row sm:gap-5"
    >
      <BaseInput
        class="w-full"
        placeholder="Title (Optional)"
        v-model="$app.story.title"
      />

      <BaseInput
        class="w-full"
        placeholder="Author (Optional)"
        v-model="$app.story.author"
      />
    </div>

    <BaseTextarea
      v-model="$app.story.content"
      class="my-4 min-h-[20rem] w-full sm:my-5"
    />

    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:gap-8">
      <div>
        <p v-if="error" class="text-pink-400">
          {{ errorMessage }}
        </p>
      </div>
      <BaseButton class="w-full sm:w-auto"> Generate Lesson </BaseButton>
    </div>
  </form>
</template>
