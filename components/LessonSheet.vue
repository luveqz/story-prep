<script setup lang="ts">
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'
import WaveSurfer from 'wavesurfer.js'

const lesson = ref<HTMLElement | undefined>()
const capturing = ref(false)
const player = ref<HTMLElement>()
const wavesurfer = ref()
const isPlaying = ref(false)
const isGeneratingAudio = ref(false)
const { $api, $app } = useNuxtApp()

const { data, execute: generateAudio } = await useAsyncData(
  $api.generateAudioLesson,
  { immediate: false },
)

const generateAudioLesson = async () => {
  isGeneratingAudio.value = true
  await generateAudio()
  const audio = data.value

  if (audio && $app.lesson) {
    $app.lesson.audioUrl = `data:audio/wav;base64,${audio.base64}`
  }
  isGeneratingAudio.value = false
  initPlayer()
}

const saveAudio = (slug: string) => {
  if (!$app.lesson?.audioUrl) {
    return
  }
  const link = document.createElement('a')

  link.href = $app.lesson.audioUrl
  link.download = `${slug}.wav`

  document.body.appendChild(link)
  link.click()
  console.log(link)
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

const togglePlayer = () => {
  isPlaying.value = !isPlaying.value
  wavesurfer.value?.playPause()
}

const initPlayer = () => {
  if ($app.lesson?.audioUrl && !wavesurfer.value) {
    wavesurfer.value = WaveSurfer.create({
      container: player.value!,
      waveColor: '#333333',
      progressColor: '#FFFFFF',
      url: $app.lesson?.audioUrl,
      cursorWidth: 0,
      barHeight: 0.8,
      dragToSeek: true,
      barWidth: 4,
      barGap: 6,
      barRadius: 2,
    })
  }
}

onMounted(() => {
  initPlayer()
})
</script>

<template>
  <div
    data-testid="lesson-sheet"
    class="max-h-[calc(100vh_-_2rem)] max-w-[40rem] grow overflow-auto rounded-md border-r-8 border-gray bg-gray"
  >
    <div v-if="$app.lesson" ref="lesson" class="bg-gray p-8" @submit.prevent>
      <header
        class="text-center"
        :class="$app.lesson.audioUrl ? 'mb-2' : 'mb-16'"
      >
        <p class="font-londrina text-xl sm:text-2xl">English Lesson: </p>

        <HeadingOne>
          {{ $app.lesson.title || 'Untitled Story' }}
        </HeadingOne>

        <p class="text-lg font-medium opacity-60 sm:text-xl">
          by {{ $app.lesson.author || 'Anonymous' }}
        </p>
      </header>

      <div
        v-show="wavesurfer && $app.lesson.audioUrl"
        class="mx-auto flex max-w-96 items-center gap-4"
      >
        <button
          v-if="wavesurfer"
          @click="togglePlayer"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray"
        >
          <PlayIcon class="w-5" v-show="!isPlaying" />
          <PauseIcon class="w-5" v-show="isPlaying" />
        </button>
        <div ref="player" class="grow" />
      </div>

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
            v-if="!$app.lesson.audioUrl"
            class="flex grow items-center gap-x-2 md:grow-0"
            data-testid="generate-audio-btn"
            variant="secondary"
            :disabled="isGeneratingAudio"
            @click="generateAudioLesson"
          >
            <LoadingIcon v-if="isGeneratingAudio" />
            {{ isGeneratingAudio ? 'Generating' : 'Generate ' }}
            audio exercise
          </BaseButton>

          <BaseButton
            v-else
            class="flex grow items-center gap-x-2 md:grow-0"
            data-testid="generate-audio-btn"
            variant="secondary"
            @click="saveAudio(`${$app.lesson.slug}`)"
          >
            Save audio
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
