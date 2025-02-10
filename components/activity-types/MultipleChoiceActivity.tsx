const MultipleChoiceActivity = ({ activity }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold'>{activity.activityName}</h2>
      <p className='mt-4'>{activity.description}</p>

      <ul className='mt-4'>
        {/* Check if questions exist before attempting to map */}
        {activity.questions && activity.questions.length > 0 ? (
          activity.questions.map((question, index) => (
            <li key={index} className='mb-2'>
              <strong>Question:</strong> {question.question} <br />
              <strong>Choices:</strong>
              <ul>
                {question.choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>{choice}</li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No questions available for this activity.</p>
        )}
      </ul>
    </div>
  )
}

export default MultipleChoiceActivity
