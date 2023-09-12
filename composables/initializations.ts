export function useInitializations() {
  const { $app } = useNuxtApp()
  const route = useRoute()

  const { api_key } = route.query

  if (api_key && typeof api_key === 'string') {
    $app.apiKey = api_key
  }
}
