import { CLARIFAI_API_BASE_URL } from '@/lib/constants'

const USER_ID = 'openai'
const APP_ID = 'chat-completion'
const MODEL_ID = 'gpt-4-turbo'
const MODEL_VERSION_ID = '182136408b4b4002a920fd500839f2c8'

export function getAdaptedClarifaiRequest({
  prompt,
  apiKey,
}: {
  prompt: string
  apiKey: string
}) {
  const url =
    CLARIFAI_API_BASE_URL +
    MODEL_ID +
    '/versions/' +
    MODEL_VERSION_ID +
    '/outputs'

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          text: {
            raw: prompt,
          },
        },
      },
    ],
  })

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Key ${apiKey}`,
    },
    body: raw,
  }

  return {
    url,
    options,
  }
}
