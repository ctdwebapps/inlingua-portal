'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  image: string // URL for the image
  title: number | string // Title text
  progress: number // Progress value (0 to 100)
  itemId: number // Unique ID for the item (unit or lesson)
  navigateTo: string
  unitNumber?: number // Optional: If displaying lessons, this will be used to show "Unit X LessonType"
}

export const Card = ({
  image,
  title,
  progress,
  itemId,
  navigateTo,
  unitNumber,
}: Props) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`${navigateTo}/${itemId}`)
  }

  return (
    <div
      className='max-w-sm shadow-lg rounded-lg overflow-hidden border m-4 cursor-pointer'
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className='h-40 overflow-hidden flex justify-center'>
        {/* <Image src={image} alt={title} className='w-full h-full object-cover' /> */}
        {/* <Image
          src={image}
          alt='Image'
          width={250}
          height={100}
          className='mt-4 object-cover'
        /> */}
      </div>

      {/* Title */}
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800'>
          {unitNumber ? `Unit ${unitNumber} ${title}` : `Unit ${title}`}
        </h3>

        {/* Progress Bar */}
        <div className='mt-4'>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className='bg-blue-300 h-3 rounded-full'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>{progress}% Complete</p>
        </div>
      </div>
    </div>
  )
}
