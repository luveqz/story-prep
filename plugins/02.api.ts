import { PALM_API_BASE_URL } from '@/lib/constants'
import { PALM_API_SAFETY_SETTINGS } from '@/lib/constants'
import { PROMPT_TEMPLATE } from '@/lib/constants'

export default defineNuxtPlugin(() => {
  const { $app } = useNuxtApp()

  return {
    provide: {
      api: {
        generateLesson() {
          return $fetch(`${PALM_API_BASE_URL}?key=${$app.apiKey}`, {
            method: 'post',
            body: {
              prompt: {
                text: PROMPT_TEMPLATE.replace(
                  '{{ STORY }}',
                  $app.story.content,
                ),
              },
              safetySettings: PALM_API_SAFETY_SETTINGS,
            },
          })
        },
      },
    },
  }
})
