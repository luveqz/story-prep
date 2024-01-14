import { defineStore } from 'pinia'
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
      lesson?: {
        title: string
        author: string
        slug: string
        content: Lesson
        audioUrl?: string
      }
    },
})
