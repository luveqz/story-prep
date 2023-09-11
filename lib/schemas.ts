import { z } from 'zod'

/*-------------------------------------
  Partials
-------------------------------------*/
const nounSchema = z.object({
  entry: z.string(),
  definition: z.string(),
  example: z.array(z.string()),
})

const verbSchema = z.object({
  entry: z.string(),
  definition: z.string(),
  example: z.array(z.string()),
})

const idiomSchema = z.object({
  entry: z.string(),
  definition: z.string(),
  example: z.array(z.string()),
})

/*-------------------------------------
  Main Schemas
-------------------------------------*/
export const LessonSchema = z.object({
  nouns: z.array(nounSchema).optional(),
  verbs: z.array(verbSchema).optional(),
  idioms: z.array(idiomSchema).optional(),
  grammar: z.array(z.string()).optional(),
})

/*-------------------------------------
  Types
-------------------------------------*/
export type Lesson = z.infer<typeof LessonSchema>
