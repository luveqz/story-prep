const error = ref(false)
const timeoutID = ref<NodeJS.Timeout>()

type TooltipArgs = { duration?: number }

export function useErrorTooltip() {
  const showErrorTooltip = (args?: TooltipArgs) => {
    if (timeoutID.value) {
      clearTimeout(timeoutID.value)
    }

    error.value = true

    timeoutID.value = setTimeout(
      () => {
        error.value = false
        timeoutID.value = undefined
      },
      (args?.duration || 4) * 1000,
    )
  }

  return {
    showErrorTooltip,
    error,
  }
}
