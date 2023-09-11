<template>
  <div
    class="max-h-[calc(100vh_-_2rem)] max-w-[40rem] grow overflow-auto rounded-md border-r-8 border-brown-700 bg-brown-700 p-8"
    @submit.prevent
  >
    <header class="mb-10 text-center">
      <p class="font-londrina text-2xl">English Lesson: </p>
      <HeadingOne>Why aren’t you laughing</HeadingOne>
      <p class="text-xl font-medium opacity-60">by David Sedaris</p>
    </header>

    <div class="flex flex-col gap-y-12">
      <LessonSheetSection
        v-if="$app.lesson?.verbs"
        title="Verbs"
        color-class="bg-blue-500"
        :entries="$app.lesson?.verbs"
      />

      <LessonSheetSection
        v-if="$app.lesson?.nouns"
        title="Nouns"
        color-class="bg-green-600"
        :entries="$app.lesson?.nouns"
      />

      <LessonSheetSection
        v-if="$app.lesson?.idioms"
        title="Idioms"
        color-class="bg-orange-400"
        :entries="$app.lesson?.idioms"
      />

      <section v-if="$app.lesson?.grammar">
        <HeadingTwo class="mb-6 text-center">Grammar Topics</HeadingTwo>

        <ul class="flex flex-wrap justify-center gap-5">
          <li
            v-for="(topic, id) in $app.lesson.grammar"
            :key="id"
            class="rounded-md border-[3px] border-dashed border-white/10 px-4 py-3 font-londrina text-xl font-light tracking-wide"
          >
            {{ topic }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
