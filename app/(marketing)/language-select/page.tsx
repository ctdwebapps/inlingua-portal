import { getLanguages } from '@/db/queries'
import { Loader2 } from 'lucide-react'
import { List } from './list'

const LanguageSelect = async () => {
  const languages = await getLanguages()
  // console.log(languages)

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
        Choose a language that you&apos;re currently studying
      </h1>
      <List languages={languages} />
      {/* {JSON.stringify(languages)} */}
    </div>
  )
}

export default LanguageSelect
