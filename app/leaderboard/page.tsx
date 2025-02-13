const students = [
  { clerkUserId: 1234, studentName: 'Tom Smith', totalPoints: 123 },
  { clerkUserId: 4321, studentName: 'Alan Jones', totalPoints: 54 },
  { clerkUserId: 1298, studentName: 'Tracy Smith', totalPoints: 540 },
]

function Leaderboard() {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-3'>Class Leaderboard</h2>
      <ul>
        {students.map((student, index) => (
          <li
            key={student.clerkUserId}
            className='flex justify-between py-2 border-b'
          >
            <span className='font-medium'>
              {index + 1}. {student.studentName}
            </span>
            <span className='text-blue-600 font-semibold'>
              {student.totalPoints} points
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
