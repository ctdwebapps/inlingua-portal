import { getLessonsForUnit } from '@/db/queries'

type Props = {
  params: { unitId: string }
}

const Unitpage = async ({ params }: Props) => {
  // Convert unitId from string to number
  const unitId = parseInt(params.unitId, 10)
  // Fetch lessons for this unit
  const lessons = await getLessonsForUnit(unitId)
  console.log(lessons)

  // Example header info for the unit page (customize as needed)
  const headerData = {
    title: `Unit ${unitId} Lessons`,
    // Add other header props like an image URL if needed
  }

  return <div>Lessons</div>
}

export default Unitpage
