'use client'
import { useState } from 'react'
import MultipleChoiceActivity from './activity-types/MultipleChoiceActivity'
import FillInTheBlankActivity from './activity-types/FillInTheBlankActivity'
import TrueFalseActivity from './activity-types/TrueFalseActivity'
import { useRouter } from 'next/navigation' // To handle navigation

const LessonClient = ({ activities }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const router = useRouter() // Hook to navigate

  const handleNext = () => {
    setCurrentActivityIndex((prevIndex) => {
      return Math.min(prevIndex + 1, activities.length - 1)
    })
  }

  const handleBackToCourse = () => {
    // Navigate to the course page (replace `/course-page` with your actual course route)
    router.push('/course')
  }

  // Check if activities are empty or if the current activity type is unknown
  if (
    !activities ||
    activities.length === 0 ||
    !activities[currentActivityIndex] ||
    !activities[currentActivityIndex].type
  ) {
    return (
      <div className='activity mt-8'>
        <p>No activities available for this lesson or unknown activity type.</p>
        <button
          onClick={handleBackToCourse}
          className='mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Back to My Course
        </button>
      </div>
    )
  }

  const activity = activities[currentActivityIndex]

  const renderActivity = () => {
    switch (activity.type) {
      case 'MultipleChoice':
        return <MultipleChoiceActivity activity={activity} />
      case 'FillInTheBlank':
        return <FillInTheBlankActivity activity={activity} />
      case 'TrueFalse':
        return <TrueFalseActivity activity={activity} />
      default:
        return <p>Unknown activity type</p>
    }
  }

  return (
    <div className='activity mt-8'>
      {renderActivity()}

      {currentActivityIndex < activities.length - 1 ? (
        <button
          onClick={handleNext}
          className='mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleBackToCourse}
          className='mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Back to My Course
        </button>
      )}
    </div>
  )
}

export default LessonClient
