import { useModalStore } from '@/stores/modal'

export default defineNuxtPlugin(() => {
  const modal = useModalStore()

  return {
    provide: {
      modal,
    },
  }
})
