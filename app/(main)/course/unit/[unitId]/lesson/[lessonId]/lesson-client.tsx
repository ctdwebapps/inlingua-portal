'use client' // This ensures the component is treated as a Client Component

import { useState } from 'react'

const LessonClient = ({ activities }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)

  // Handle the "Next" button click to go to the next activity
  const handleNext = () => {
    setCurrentActivityIndex((prevIndex) => {
      // Ensure we don't go past the last activity
      return Math.min(prevIndex + 1, activities.length - 1)
    })
  }

  // Get the current activity based on the index
  const activity = activities[currentActivityIndex]

  // If no activity exists, show a message
  if (!activity) {
    return <p>No activities available for this lesson.</p>
  }
  console.log(activities)

  return (
    <div className='activity mt-8'>
      <h2 className='text-2xl font-semibold'>{activity.activityName}</h2>
      <p className='mt-4'>{activity.description}</p>

      {/* Displaying Questions */}
      <ul className='mt-4'>
        {activity?.questions?.length ? (
          activity.questions.map((question, index) => (
            <li key={index} className='mb-2'>
              <strong>Question:</strong> {question.question} <br />
              <strong>Answer:</strong> {question.answer}
            </li>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>

      {/* "Next" button */}
      {currentActivityIndex < activities.length - 1 && (
        <button
          onClick={handleNext}
          className='mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Next
        </button>
      )}
    </div>
  )
}

export default LessonClient
