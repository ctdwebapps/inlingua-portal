import { FeedWrapper } from '@/components/feed-wrapper'
// import { StickyWrapper } from '@/components/sticky-wrapper'
import { Header } from './header'
// import { UserProgress } from '@/components/user-progress'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card } from './card'

import { getStudentCourseWithUnits } from '@/db/queries'

const CoursePage = async () => {
  const { userId } = await auth()
  // console.log(userId)

  // If userId is missing, redirect to login page
  if (!userId) {
    redirect('/') // Redirect to login page
  }

  const courseData = await getStudentCourseWithUnits(userId)
  // console.log(courseData)

  const units = courseData?.class?.course.units
  console.log(units)

  // Fallback UI if no course data is found
  if (!courseData) {
    return <div>No course available</div>
  }

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
        <div>
          <h1 className='text-3xl'>
            {courseData.class?.course.courseName} Course
          </h1>
          <h2 className='text-2xl'>{courseData.class?.level}</h2>
          <h3 className='text-lg'>
            {courseData.class?.course.courseObjectives}
          </h3>
          {/* <h2 className='text-2xl mt-5'>Modules:</h2>
          {JSON.stringify(courseData.class?.course.units)} */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 max-w-screen-xl mx-auto gap-1 pt-8'>
            {units?.map((unit) => (
              <Card
                title={unit.unitNumber}
                key={unit.id}
                progress={50}
                unitId={unit.id}
              />
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default CoursePage
