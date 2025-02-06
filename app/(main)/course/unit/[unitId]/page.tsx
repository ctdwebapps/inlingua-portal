import { getLessonsForUnit } from '@/db/queries'
import { Card } from '../../card'

type Props = {
  params: { unitId: string }
}

const Unitpage = async ({ params }: Props) => {
  // Convert unitId from string to number
  const unitId = parseInt(params.unitId, 10)

  // Fetch lessons for this unit
  const lessonData = await getLessonsForUnit(unitId)
  // console.log(lessonData)
  // console.log(unitId)

  return (
    <div>
      <h1>Lessons</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 max-w-screen-xl mx-auto gap-1 pt-8'>
        {lessonData?.map((lesson) => (
          <Card
            // image={lesson.image}
            title={lesson.lessonType}
            key={lesson.id}
            progress={50}
            itemId={lesson.id}
            navigateTo={`/course/unit/${unitId}/lesson`}
            unitNumber={unitId}
          />
        ))}
      </div>
    </div>
  )
}

export default Unitpage
