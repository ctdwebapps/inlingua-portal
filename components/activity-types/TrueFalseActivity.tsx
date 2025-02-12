// 'use client'

// const TrueFalseActivity = ({ activity }) => {
//   if (!activity || !activity.questions) {
//     return <p>No questions available for this activity.</p>
//   }

//   return (
//     <div className='true-false-activity'>
//       <h3 className='text-xl font-semibold'>{activity.activityName}</h3>
//       <p className='mt-4'>{activity.description}</p>

//       <ul className='mt-4'>
//         {activity.questions.map((question, index) => (
//           <li key={index} className='mb-4'>
//             <p>
//               <strong>{question.question}</strong>
//             </p>
//             <div className='mt-2'>
//               <label>
//                 <input type='radio' name={`question-${index}`} value='true' />{' '}
//                 True
//               </label>
//               <label className='ml-4'>
//                 <input type='radio' name={`question-${index}`} value='false' />{' '}
//                 False
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default TrueFalseActivity

'use client'

import { useState } from 'react'
import { Button } from '../ui/button'

const TrueFalseActivity = ({ activity }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(
    activity.questions.map(() => null) // Initial state to track selected answers
  )

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...selectedAnswers]
    updatedAnswers[index] = value // Store the selected answer (true/false)
    setSelectedAnswers(updatedAnswers)
  }

  if (!activity || !activity.questions) {
    return (
      <p className='text-red-500'>No questions available for this activity.</p>
    )
  }

  return (
    <div className='space-y-6'>
      <h3 className='text-xl font-semibold'>{activity.activityName}</h3>
      <p className='text-lg text-gray-700'>{activity.description}</p>

      <ul className='space-y-4'>
        {activity.questions.map((question, index) => (
          <li key={index} className='bg-gray-100 p-4 rounded-lg shadow-sm'>
            <div className='mb-4'>
              <strong>{question.question}</strong>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div
                className={`p-4 text-center cursor-pointer rounded-lg shadow-lg ${
                  selectedAnswers[index] === 'true'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handleAnswerChange(index, 'true')}
              >
                True
              </div>

              <div
                className={`p-4 text-center cursor-pointer rounded-lg shadow-lg ${
                  selectedAnswers[index] === 'false'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handleAnswerChange(index, 'false')}
              >
                False
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
        Submit Answers
      </Button>
    </div>
  )
}

export default TrueFalseActivity
