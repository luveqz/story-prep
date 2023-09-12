<script setup lang="ts">
import stories from '@/data/stories.json'

useInitializations()
const { $modal, $app } = useNuxtApp()

const openLesson = (lesson: typeof $app.lesson) => {
  $app.lesson = lesson
  $modal.open('lesson-sheet')
}
</script>

<template>
  <div
    class="absolute left-0 top-0 flex min-h-full w-full flex-col items-center"
  >
    <!-- Background Blob -->
    <div
      class="absolute left-0 top-0 flex h-[18rem] w-full justify-center overflow-x-hidden sm:h-[24.6rem]"
    >
      <TheBlob class="absolute bottom-0 h-full min-w-full" />
    </div>

    <!-- Page Content -->
    <main
      class="mt-4 flex min-h-full max-w-[34rem] grow flex-col items-center px-4 sm:mt-8 sm:px-0"
    >
      <TheHeader />

      <aside class="relative mt-14 w-full sm:mt-24">
        <HeadingTwo class="text-center"> Examples </HeadingTwo>

        <section class="mt-6 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-10">
          <StoryCard
            v-for="story in stories"
            :key="story.id"
            :title="story.title"
            :author="story.author"
            :image-url="story.imageUrl"
            @click="
              openLesson({
                title: story.title,
                author: story.author,
                content: story.lesson,
              })
            "
          />
        </section>
      </aside>

      <TheFooter class="mb-3 mt-8 flex grow items-end sm:mb-5 sm:mt-16" />
    </main>

    <!-- Modals -->
    <BaseModal name="story-textbox">
      <StoryForm />
    </BaseModal>

    <BaseModal name="api-key">
      <ApiKeyForm />
    </BaseModal>

    <BaseModal name="lesson-sheet">
      <LessonSheet />
    </BaseModal>
  </div>
</template>
