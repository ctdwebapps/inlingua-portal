import { cache } from 'react'
import { db } from './drizzle'
import { eq } from 'drizzle-orm'
import { lessons, students } from './schema'

//get languages for language-select page
export const getLanguages = cache(async () => {
  const data = await db.query.languages.findMany()
  return data
})

// get the active language for language-select page
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

//get units with lessons used in course page
export const getUnitsWithlessons = async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.clerkUserId, userId),
    with: {
      class: {
        with: {
          course: {
            with: {
              units: {
                with: {
                  lessons: true, // Include the lessons for each unit
                },
              },
            },
          },
          language: true,
        },
      },
    },
  })

  return data
}

// Get a specific lesson by ID used in lesson page
export const getLessonById = async (lessonId: number) => {
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  })

  return lesson
}
