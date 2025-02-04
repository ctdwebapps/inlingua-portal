// 'use client'

// import { languages } from '@/db/schema'
// import { Card } from './card'
// import { useRouter } from 'next/navigation'

// type Props = {
//   languages: (typeof languages.$inferSelect)[]
//   activeLanguage: string | null
// }

// export const List = ({ languages, activeLanguage }: Props) => {
//   const router = useRouter()
//   return (
//     <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
//       {languages.map((language) => (
//         <Card
//           key={language.id}
//           id={language.id}
//           language={language.language}
//           imageSrc={language.imageSrc}
//           onClick={() => {
//             if (activeLanguage === language.languageCode) {
//               router.push('/course')
//             }
//           }}
//           disabled={activeLanguage !== language.languageCode} // Disable languages that aren't active
//         />
//       ))}
//     </div>
//   )
// }

'use client'

import { languages } from '@/db/schema'
import { Card } from './card'

type Props = {
  languages: (typeof languages.$inferSelect)[]
}

export const List = ({ languages }: Props) => {
  return (
    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
      {languages.map((language) => (
        <Card
          key={language.id}
          id={language.id}
          language={language.language}
          imageSrc={language.imageSrc}
          onClick={() => {}}
          disabled={false}
        />
      ))}
    </div>
  )
}
