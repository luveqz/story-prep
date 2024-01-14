import { LessonSchema } from '@/lib/schemas'

export function getAdaptedLesson(data: any) {
  let lesson

  try {
    const output = data.candidates[0].output

    // Clean the string from LLM explanations.
    const jsonMatch = output.match(/\{[^]*\}$/)

    if (jsonMatch) {
      const jsonString = jsonMatch[0]
      lesson = JSON.parse(jsonString)
    } else {
      console.error('No JSON data found in the input string.')
    }
  } catch (error) {
    console.error(error)
  }

  const result = LessonSchema.safeParse(lesson)

  if (result.success) {
    return result.data
  }

  return { error: 'We got an unexpected response from the LLM, please retry.' }
}
