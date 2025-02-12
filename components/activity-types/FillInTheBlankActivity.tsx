// import React, { useState } from 'react'

// const FillInTheBlankActivity = ({ activity }) => {
//   const [answers, setAnswers] = useState(
//     activity.questions.map(() => '') // Initial state is an empty string for each question
//   )

//   const handleInputChange = (index: number, value: string) => {
//     const updatedAnswers = [...answers]
//     updatedAnswers[index] = value
//     setAnswers(updatedAnswers)
//   }

//   return (
//     <div className='fill-in-the-blank-activity'>
//       <h3>{activity.activityName}</h3>
//       <p>{activity.description}</p>

//       {activity.questions.map((question, index) => (
//         <div key={index} className='question-container'>
//           <p>{question.question}</p>
//           <input
//             type='text'
//             value={answers[index]}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//             placeholder='Your answer'
//             className='mt-2 p-2 border border-gray-300 rounded'
//           />
//         </div>
//       ))}

//       {answers.every(
//         (answer, index) => answer === activity.questions[index].answer
//       ) && <div className='text-green-500 mt-4'>All answers are correct!</div>}
//     </div>
//   )
// }

// export default FillInTheBlankActivity

import React, { useState } from 'react'
import { Button } from '../ui/button'

const FillInTheBlankActivity = ({ activity }) => {
  const [answers, setAnswers] = useState(
    activity.questions.map(() => '') // Initial state is an empty string for each question
  )

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = value
    setAnswers(updatedAnswers)
  }

  const allCorrect = answers.every(
    (answer, index) =>
      answer.toLowerCase() === activity.questions[index].answer.toLowerCase()
  )

  return (
    <div className='space-y-6'>
      <h3 className='text-2xl font-semibold'>{activity.activityName}</h3>
      <p className='text-lg text-gray-700'>{activity.description}</p>

      {activity.questions.map((question, index) => (
        <div key={index} className='flex flex-col space-y-2'>
          <p className='text-lg'>{question.question}</p>
          <input
            type='text'
            value={answers[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder='Your answer'
            className='p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      ))}

      {allCorrect && (
        <div className='text-green-500 font-medium'>
          <p>All answers are correct!</p>
        </div>
      )}

      {!allCorrect && (
        <Button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
          Submit Answers
        </Button>
      )}
    </div>
  )
}

export default FillInTheBlankActivity
