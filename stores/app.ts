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
      story: {
        title: '',
        author: '',
        content: '',
      },
      lesson: undefined,
    }) as {
      apiKey: string
      story: {
        title: string
        author: string
        content: string
      }
      lesson: { title: string; author: string; content: Lesson } | undefined
    },

  actions: {
    generateLesson() {
      return $fetch(`${PALM_API_BASE_URL}?key=${this.apiKey}`, {
        method: 'post',
        body: {
          prompt: {
            text: PROMPT_TEMPLATE.replace('{{ STORY }}', this.story.content),
          },
          safetySettings: PALM_API_SAFETY_SETTINGS,
        },
      })
    },
  },
})
