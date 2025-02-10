import { notFound } from 'next/navigation'
import { getLessonById } from '@/db/queries'
import LessonClient from '@/components/lesson-client' // Client Component

const LessonPage = async ({ params }) => {
  const { unitId, lessonId } = params

  // Fetch the lesson data from the database or API
  const lesson = await getLessonById(Number(lessonId))

  if (!lesson) {
    return notFound() // Return a 404 if the lesson is not found
  }

  console.log(lesson.activities)

  // Pass the lesson data to the Client Component
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold'>
        Unit {unitId} {lesson.lessonType}
      </h1>
      <p className='text-lg mt-2'>{lesson.lessonObjectives}</p>

      {/* Pass the lesson data to the Client Component */}
      <LessonClient activities={lesson.activities} />
    </div>
  )
}

export default LessonPage
