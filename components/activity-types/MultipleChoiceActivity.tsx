// const MultipleChoiceActivity = ({ activity }) => {
//   return (
//     <div>
//       <h2 className='text-2xl font-semibold'>{activity.activityName}</h2>
//       <p className='mt-4'>{activity.description}</p>

//       <ul className='mt-4'>
//         {/* Check if questions exist before attempting to map */}
//         {activity.questions && activity.questions.length > 0 ? (
//           activity.questions.map((question, index) => (
//             <li key={index} className='mb-2'>
//               <strong>Question:</strong> {question.question} <br />
//               <strong>Choices:</strong>
//               <ul>
//                 {question.choices.map((choice, choiceIndex) => (
//                   <li key={choiceIndex}>{choice}</li>
//                 ))}
//               </ul>
//             </li>
//           ))
//         ) : (
//           <p>No questions available for this activity.</p>
//         )}
//       </ul>
//     </div>
//   )
// }

// export default MultipleChoiceActivity

import { useState } from 'react'
import { Button } from '../ui/button'

const MultipleChoiceActivity = ({ activity }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(
    activity.questions.map(() => null) // Initial state to track selected answers
  )

  const handleChoiceChange = (questionIndex, choiceIndex) => {
    const updatedAnswers = [...selectedAnswers]
    updatedAnswers[questionIndex] = choiceIndex // Store the choice index
    setSelectedAnswers(updatedAnswers)
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold'>{activity.activityName}</h2>
      <p className='text-lg text-gray-700'>{activity.description}</p>

      <ul className='space-y-4'>
        {/* Check if questions exist before attempting to map */}
        {activity.questions && activity.questions.length > 0 ? (
          activity.questions.map((question, questionIndex) => (
            <li
              key={questionIndex}
              className='bg-gray-100 p-4 rounded-lg shadow-sm'
            >
              <div className='mb-4'>
                <strong className='text-lg'>{question.question}</strong>
              </div>

              <ul className='space-y-2'>
                {question.choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    <label className='inline-flex items-center space-x-2'>
                      <input
                        type='radio'
                        name={`question-${questionIndex}`}
                        checked={selectedAnswers[questionIndex] === choiceIndex}
                        onChange={() =>
                          handleChoiceChange(questionIndex, choiceIndex)
                        }
                        className='form-radio text-blue-500'
                      />
                      <span>{choice}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p className='text-red-500'>
            No questions available for this activity.
          </p>
        )}
      </ul>

      <Button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
        Submit Answers
      </Button>
    </div>
  )
}

export default MultipleChoiceActivity
