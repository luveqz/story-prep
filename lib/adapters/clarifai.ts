import { CLARIFAI_API_BASE_URL } from '@/lib/constants'

const MODELS = {
  'gpt-4-turbo': {
    USER_ID: 'openai',
    APP_ID: 'chat-completion',
    MODEL_ID: 'gpt-4-turbo',
    MODEL_VERSION_ID: '182136408b4b4002a920fd500839f2c8',
  },
  'openai-tts-1': {
    USER_ID: 'openai',
    APP_ID: 'tts',
    MODEL_ID: 'openai-tts-1',
    MODEL_VERSION_ID: 'fff6ce1fd487457da95b79241ac6f02d',
  },
}

export function getAdaptedClarifaiRequest({
  prompt,
  apiKey,
  model,
}: {
  prompt: string
  apiKey: string
  model: keyof typeof MODELS
}) {
  const url =
    CLARIFAI_API_BASE_URL +
    MODELS[model].MODEL_ID +
    '/versions/' +
    MODELS[model].MODEL_VERSION_ID +
    '/outputs'

  const raw = JSON.stringify({
    user_app_id: {
      user_id: MODELS[model].USER_ID,
      app_id: MODELS[model].APP_ID,
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
