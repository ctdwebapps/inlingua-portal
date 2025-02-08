import { FeedWrapper } from '@/components/feed-wrapper'
// import { StickyWrapper } from '@/components/sticky-wrapper'
import { Header } from './header'
// import { UserProgress } from '@/components/user-progress'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getUnitsWithlessons } from '@/db/queries'
import Link from 'next/link'

const CoursePage = async () => {
  const { userId } = await auth()
  // console.log(userId)

  // If userId is missing, redirect to login page
  if (!userId) {
    redirect('/') // Redirect to login page
  }

  const courseData = await getUnitsWithlessons(userId)
  // console.log(courseData)

  // Fallback UI if no course data is found
  if (!courseData) {
    return <div>No course available</div>
  }

  const units = courseData?.class?.course.units
  // console.log(units)

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      {/* <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'Spanish', imageSrc: '/es.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper> */}
      <FeedWrapper>
        <Header
          flag={courseData.class?.language.imageSrc}
          hearts={5}
          points={100}
        />

        <div className='px-6 py-8'>
          <h1 className='text-3xl font-bold mb-2'>
            {courseData.class?.course.courseName} Course
          </h1>
          <h2 className='text-2xl mb-2'>{courseData.class?.level}</h2>
          <h3 className='text-lg mb-6'>
            {courseData.class?.course.courseObjectives}
          </h3>
          <div className='grid grid-cols-1 gap-8'>
            {units?.map((unit) => (
              <Card key={unit.id} className='bg-white shadow-lg'>
                <CardHeader>
                  <CardTitle className='text-2xl font-semibold'>
                    Unit {unit.unitNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col space-y-3'>
                    {unit.lessons?.map((lesson) => (
                      <Link
                        href={`/course/unit/${unit.id}/lesson/${lesson.id}`}
                        key={lesson.id}
                      >
                        <Button
                          variant='primaryOutline'
                          className='w-full justify-start text-orange-500'
                        >
                          {lesson.lessonType}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default CoursePage
