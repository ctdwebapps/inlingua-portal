import { cache } from 'react'
import { db } from './drizzle'
import { eq } from 'drizzle-orm'
import { students } from './schema'

//get languages for language-select page
export const getLanguages = cache(async () => {
  const data = await db.query.languages.findMany()
  return data
})

//get the active language
export const getActiveLanguage = cache(async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.clerkUserId, userId),
    with: {
      class: {
        with: {
          language: true,
        },
      },
    },
  })
  return data
})
