<script setup lang="ts">
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'

const lesson = ref<HTMLElement | undefined>()
const capturing = ref(false)
const { $api } = useNuxtApp()

const {
  data,
  execute: generateAudio,
  pending: generatingAudio,
} = await useAsyncData($api.generateAudioLesson, { immediate: false })

const generateAudioLesson = async (slug: string) => {
  await generateAudio()
  const audio = data.value

  if (audio) {
    const link = document.createElement('a')

    const format = audio.audio_info.audio_format.toLowerCase()
    link.href = `data:audio/${format};base64,${audio.base64}`
    link.download = `${slug}.${format}`

    document.body.appendChild(link)
    link.click()
    console.log(link)
  }
}

const saveAsPdf = async (filename: string) => {
  if (lesson.value) {
    const scale = 2
    const { width, height } = lesson.value.getBoundingClientRect()

    capturing.value = true
    const blob = await domtoimage.toPng(lesson.value, {
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      },
    })
    capturing.value = false

    const outputScale = 0.4
    const pdf = new jsPDF('p', 'px', [
      width * outputScale,
      height * outputScale,
    ])
    pdf.addImage(blob, 'PNG', 0, 0, width * outputScale, height * outputScale)

    pdf.save(filename)
  }
}
</script>

<template>
  <div
    data-testid="lesson-sheet"
    class="max-h-[calc(100vh_-_2rem)] max-w-[40rem] grow overflow-auto rounded-md border-r-8 border-gray bg-gray"
  >
    <div v-if="$app.lesson" ref="lesson" class="bg-gray p-8" @submit.prevent>
      <header class="mb-10 text-center">
        <p class="font-londrina text-xl sm:text-2xl">English Lesson: </p>

        <HeadingOne>
          {{ $app.lesson.title || 'Untitled Story' }}
        </HeadingOne>

        <p class="text-lg font-medium opacity-60 sm:text-xl">
          by {{ $app.lesson.author || 'Anonymous' }}
        </p>
      </header>

      <div class="flex flex-col gap-y-12">
        <LessonSheetSection
          v-if="$app.lesson.content.verbs"
          title="Verbs"
          color-class="bg-blue-500"
          :entries="$app.lesson.content.verbs"
        />

        <LessonSheetSection
          v-if="$app.lesson.content.nouns"
          title="Nouns"
          color-class="bg-green-600"
          :entries="$app.lesson.content.nouns"
        />

        <LessonSheetSection
          v-if="$app.lesson.content.idioms"
          title="Idioms"
          color-class="bg-orange-400"
          :entries="$app.lesson.content.idioms"
        />

        <section v-if="$app.lesson.content.grammar">
          <HeadingTwo class="mb-6 text-center">Grammar Topics</HeadingTwo>

          <ul class="flex flex-wrap justify-center gap-5">
            <li
              v-for="(topic, id) in $app.lesson.content.grammar"
              :key="id"
              class="whitespace-nowrap rounded-md border-[3px] border-dashed border-white/10 px-2 py-1 font-londrina text-xl font-light tracking-wide"
            >
              {{ topic }}
            </li>
          </ul>
        </section>

        <div v-if="!capturing" class="flex flex-wrap justify-end gap-7">
          <BaseButton
            class="grow md:grow-0"
            data-testid="generate-audio-btn"
            variant="secondary"
            @click="generateAudioLesson(`${$app.lesson.slug}`)"
          >
            Generate audio exercise
          </BaseButton>

          <BaseButton
            class="grow md:grow-0"
            data-testid="save-btn"
            @click="saveAsPdf(`${$app.lesson.slug}.pdf`)"
          >
            Save as PDF
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
