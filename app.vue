<script setup lang="ts">
import stories from '@/data/stories.json'
</script>

<template>
  <div
    class="absolute left-0 top-0 flex min-h-full w-full flex-col items-center"
  >
    <!-- Background Blob -->
    <div class="absolute left-0 top-0 flex h-[24.6rem] w-full justify-center">
      <TheBlob class="absolute bottom-0 h-full min-w-full" />
    </div>

    <!-- Page Content -->
    <main class="flex min-h-full max-w-[34rem] grow flex-col items-center">
      <TheHeader />

      <aside class="relative mt-24">
        <h2 class="text-center font-londrina text-3xl">Examples</h2>

        <section class="mt-9 grid grid-cols-2 gap-10">
          <StoryCard
            v-for="story in stories"
            :key="story.id"
            :title="story.title"
            :author="story.author"
            :image-url="story.imageUrl"
          />
        </section>
      </aside>

      <TheFooter class="mb-5 mt-16 flex grow items-end" />
    </main>

    <!-- Modals -->
    <BaseModal name="story-textbox"> <StoryForm /> </BaseModal>
  </div>
</template>
