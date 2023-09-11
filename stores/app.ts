import { defineStore } from 'pinia'

import { PALM_API_BASE_URL } from '@/lib/constants'
import { PALM_API_SAFETY_SETTINGS } from '@/lib/constants'
import { PROMPT_TEMPLATE } from '@/lib/constants'
import type { Lesson } from '@/lib/schemas'

export const useAppStore = defineStore({
  id: 'app-store',

  state: () =>
    ({
      apiKey: '',
      story: '',
      lesson: undefined,
    }) as {
      apiKey: string
      story: string
      lesson: Lesson | undefined
    },

  actions: {
    generateLesson() {
      return $fetch(`${PALM_API_BASE_URL}?key=${this.apiKey}`, {
        method: 'post',
        body: {
          prompt: {
            text: PROMPT_TEMPLATE.replace('{{ STORY }}', this.story),
          },
          safetySettings: PALM_API_SAFETY_SETTINGS,
        },
      })
    },
  },
})
