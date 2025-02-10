'use client'

const TrueFalseActivity = ({ activity }) => {
  if (!activity || !activity.questions) {
    return <p>No questions available for this activity.</p>
  }

  return (
    <div className='true-false-activity'>
      <h3 className='text-xl font-semibold'>{activity.activityName}</h3>
      <p className='mt-4'>{activity.description}</p>

      <ul className='mt-4'>
        {activity.questions.map((question, index) => (
          <li key={index} className='mb-4'>
            <p>
              <strong>{question.question}</strong>
            </p>
            <div className='mt-2'>
              <label>
                <input type='radio' name={`question-${index}`} value='true' />{' '}
                True
              </label>
              <label className='ml-4'>
                <input type='radio' name={`question-${index}`} value='false' />{' '}
                False
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrueFalseActivity
