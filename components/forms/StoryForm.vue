<script setup lang="ts">
import { getAdaptedLesson } from '@/lib/adapters'
import { slugify } from '@/lib/utils/string'

const { $app, $api, $modal } = useNuxtApp()

const { data, error, execute, pending, status } = await useAsyncData(
  $api.generateLesson,
  { immediate: false },
)
const adapterError = ref('')

watch(pending, () => {
  if (!pending.value) {
    adapterError.value = ''

    const lesson = getAdaptedLesson(data.value)

    if ('error' in lesson) {
      adapterError.value = lesson.error
      return
    }

    if (lesson) {
      $app.lesson = {
        title: $app.story.title,
        slug: slugify($app.story.title),
        author: $app.story.author,
        content: lesson,
      }
      $modal.open('lesson-sheet')
    }
  }
})

const apiError = computed(
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
        <p v-if="error || adapterError" class="text-pink-400">
          {{ adapterError || apiError }}
        </p>
      </div>
      <BaseButton
        class="flex w-full items-center gap-x-2 sm:w-auto"
        :disabled="status === 'pending'"
      >
        <LoadingIcon v-if="status === 'pending'" />
        {{ status === 'pending' ? 'Generating' : 'Generate' }} Lesson
      </BaseButton>
    </div>
  </form>
</template>
