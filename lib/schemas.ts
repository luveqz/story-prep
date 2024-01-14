import { z } from 'zod'

/*-------------------------------------
  Partials
-------------------------------------*/
const entrySchema = z.object({
  entry: z.string(),
  definition: z.string(),
  examples: z.array(z.string()),
})

/*-------------------------------------
  Main Schemas
-------------------------------------*/
export const LessonSchema = z.object({
  nouns: z.array(entrySchema).optional(),
  verbs: z.array(entrySchema).optional(),
  idioms: z.array(entrySchema).optional(),
  grammar: z.array(z.string()).optional(),
})

/*-------------------------------------
  Types
-------------------------------------*/
export type Lesson = z.infer<typeof LessonSchema>
export type LessonEntry = z.infer<typeof entrySchema>
