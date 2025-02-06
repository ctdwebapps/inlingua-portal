'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  image: string // URL for the image
  title: number // Title text
  progress: number // Progress value (0 to 100)
  unitId: number // Unique ID for the module (or dynamic route parameter)
}

export const Card = ({ image, title, progress, unitId }: Props) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/course/unit/${unitId}`) // Redirects to the dynamic route for the module
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
        <h3 className='text-lg font-semibold text-gray-800'>Unit {title}</h3>

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
