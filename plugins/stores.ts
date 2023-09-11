import { useAppStore } from '@/stores/app'
import { useModalStore } from '@/stores/modal'

export default defineNuxtPlugin(() => {
  const app = useAppStore()
  const modal = useModalStore()

  return {
    provide: {
      app,
      modal,
    },
  }
})
