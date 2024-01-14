import type { LessonEntry, Lesson } from '@/lib/schemas'
import { LessonSchema } from '@/lib/schemas'

export function getAdaptedLesson(data: any) {
  let lesson

  try {
    // Clean the string from LLM explanations.
    const jsonMatch = data.match(/{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/g)

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

function getAdaptedScriptEntry(entry: LessonEntry) {
  return `
${entry.entry}: ${entry.definition} 

Usage examples of "${entry.entry}":
- ${entry.examples.map((example: string) => example).join('\n- ')}

`
}

export function getAdaptedLessonScript(content: Lesson) {
  let script = ''

  if (content.verbs) {
    script += 'Part One: Verbs...\n'
    script += content.verbs.map((noun) => getAdaptedScriptEntry(noun))
  }

  if (content.nouns) {
    script += 'Part Two: Nouns...\n'
    script += content.nouns.map((noun) => getAdaptedScriptEntry(noun))
  }

  if (content.idioms) {
    script += 'Part Three: Idioms...\n'
    script += content.idioms.map((noun) => getAdaptedScriptEntry(noun))
  }

  return script
}
