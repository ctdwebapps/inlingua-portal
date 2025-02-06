import { getLessonById } from '@/db/queries' // Adjust the path as needed

type Props = {
  params: { lessonId: string }
}

const LessonPage = async ({ params }: Props) => {
  const lessonId = parseInt(params.lessonId, 10)

  // Fetch the lesson from the database or API
  const lesson = await getLessonById(lessonId)

  // Handle the case where lesson is not found
  if (!lesson) {
    return <p>Lesson not found</p>
  }

  return (
    <div>
      <h1>{`LessonType: ${lesson.lessonType}`}</h1>
      <p>Objectives: {lesson.lessonObjectives}</p>

      <div>
        <h2>Activities</h2>
        {lesson.activities && lesson.activities.length > 0 ? (
          lesson.activities.map((activity, index) => (
            <div key={index} className='activity'>
              <h3>{activity.activityName}</h3>
              <p>{activity.description}</p>

              {/* Displaying Questions */}
              <ul>
                {activity.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <strong>Question:</strong> {question.question} <br />
                    <strong>Answer:</strong> {question.answer}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No activities available for this lesson.</p>
        )}
      </div>
    </div>
  )
}

export default LessonPage
