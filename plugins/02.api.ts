import { getAdaptedClarifaiRequest } from '@/lib/adapters/clarifai'
import { getAdaptedLessonScript } from '@/lib/adapters/lesson'
import { PROMPT_TEMPLATE } from '@/lib/constants'

export default defineNuxtPlugin(() => {
  const { $app } = useNuxtApp()

  return {
    provide: {
      api: {
        async generateTextLesson() {
          const { url, options } = getAdaptedClarifaiRequest({
            prompt: PROMPT_TEMPLATE.replace('{{ STORY }}', $app.story.content),
            apiKey: $app.apiKey,
            model: 'gpt-4-turbo',
          })

          const response = await $fetch<any>(url, options as any)

          try {
            return response['outputs'][0]['data']['text']['raw']
          } catch (error) {
            console.error(error)
          }
        },

        async generateAudioLesson() {
          if (!$app.lesson?.content) return
          const script = getAdaptedLessonScript($app.lesson.content)

          const { url, options } = getAdaptedClarifaiRequest({
            prompt: script,
            apiKey: $app.apiKey,
            model: 'openai-tts-1',
          })

          const response = await $fetch<any>(url, options as any)

          try {
            return response['outputs'][0]['data']['audio']
          } catch (error) {
            console.error(error)
          }
        },
      },
    },
  }
})
