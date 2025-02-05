import { db } from '@/db/drizzle'
import { students } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

//get languages for language-select page
export const getLanguages = cache(async () => {
  const data = await db.query.languages.findMany()
  return data
})

//get the active language
export const getActiveLanguage = cache(async (userId: string) => {
  return await db.query.students.findFirst({
    where: eq(students.clerkUserId, userId),
    with: {
      class: {
        with: {
          course: true,
          language: true,
        },
      },
    },
  })
})

const Temporary = async () => {
  const { userId } = await auth()
  // console.log(userId)

  const languages = await getLanguages()
  const studentLanguage = await getActiveLanguage(userId)
  // console.log(activeLanguage?.class?.language.language)
  const activeLanguage = studentLanguage?.class?.language.language
  // console.log(activeLanguage)

  return (
    <div>
      {/* <p>
        Language:{' '}
        {languages.map((language) => (
          <li>{language.language}</li>
        ))}
      </p> */}
    </div>
  )
}

export default Temporary
