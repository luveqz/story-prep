import { getAdaptedClarifaiRequest } from '@/lib/adapters/clarifai'
import { PROMPT_TEMPLATE } from '@/lib/constants'

export default defineNuxtPlugin(() => {
  const { $app } = useNuxtApp()

  return {
    provide: {
      api: {
        async generateLesson() {
          const { url, options } = getAdaptedClarifaiRequest({
            prompt: PROMPT_TEMPLATE.replace('{{ STORY }}', $app.story.content),
            apiKey: $app.apiKey,
          })

          const response = await $fetch<any>(url, options as any)

          try {
            return response['outputs'][0]['data']['text']['raw']
          } catch (error) {
            console.error(error)
          }
        },
      },
    },
  }
})
