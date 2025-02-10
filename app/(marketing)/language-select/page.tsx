import { getActiveLanguage, getLanguages } from '@/db/queries'
import { Loader2 } from 'lucide-react'
import { List } from './list'
import { auth } from '@clerk/nextjs/server'

const LanguageSelect = async () => {
  const { userId } = await auth()
  console.log(userId)

  // Check if the userId is null or undefined, and handle the case accordingly
  if (!userId) {
    return <div>Error: You must be logged in to view this page.</div>
  }

  // Fetch all languages and student class language in parallel
  const [languages, studentLanguage] = await Promise.all([
    getLanguages(),
    getActiveLanguage(userId),
  ])

  const activeLanguage = studentLanguage?.class?.language.language

  // console.log(activeLanguage)

  // Handle empty states and loading
  if (!languages?.length) {
    return (
      <div className='h-full flex items-center justify-center text-neutral-600 text-center'>
        <p>No languages available. Please contact your administrator.</p>
      </div>
    )
  }

  if (!studentLanguage) {
    return (
      <div className='h-full flex items-center justify-center text-neutral-600 text-center'>
        <p>
          You are not assigned to a class yet. Please inform your teacher or
          course organizer.
        </p>
      </div>
    )
  }

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto lg:min-w-[800px]'>
      {/* Loading state */}
      {!languages && (
        <div className='flex items-center justify-center h-full'>
          <Loader2 className='animate-spin text-neutral-500' />
          <span className='ml-2'>Loading languages...</span>
        </div>
      )}

      <h1 className='text-2xl font-bold mt-10 text-neutral-700 text-center'>
        Choose the language that you&apos;re studying
      </h1>
      <List languages={languages} activeLanguage={activeLanguage} />
      {/* {JSON.stringify(languages)} */}
    </div>
  )
}

export default LanguageSelect
