import React, { useState } from 'react'

const FillInTheBlankActivity = ({ activity }) => {
  const [answers, setAnswers] = useState(
    activity.questions.map(() => '') // Initial state is an empty string for each question
  )

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = value
    setAnswers(updatedAnswers)
  }

  return (
    <div className='fill-in-the-blank-activity'>
      <h3>{activity.activityName}</h3>
      <p>{activity.description}</p>

      {activity.questions.map((question, index) => (
        <div key={index} className='question-container'>
          <p>{question.question}</p>
          <input
            type='text'
            value={answers[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder='Your answer'
            className='mt-2 p-2 border border-gray-300 rounded'
          />
        </div>
      ))}

      {answers.every(
        (answer, index) => answer === activity.questions[index].answer
      ) && <div className='text-green-500 mt-4'>All answers are correct!</div>}
    </div>
  )
}

export default FillInTheBlankActivity
