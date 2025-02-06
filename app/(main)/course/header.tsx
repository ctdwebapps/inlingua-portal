import Image from 'next/image'
import Link from 'next/link'

type Props = {
  flag: string
  points: number
  hearts: number
}

export const Header = ({ flag, points, hearts }: Props) => {
  // console.log(flag)
  return (
    <div className='sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50'>
      <div className='flex items-center justify-between gap-x-2 w-full'>
        <Link href='/course'>
          <Image
            src={flag}
            alt='image'
            className='rounded-md border'
            width={40}
            height={40}
          />
        </Link>

        <div className='text-orange-500 flex font-bold text-sm items-center'>
          <Image
            src='/points.svg'
            alt='points'
            height={28}
            width={28}
            className='mr-2'
          />
          POINTS: {points}
        </div>

        <div className='text-rose-500 flex font-bold text-sm items-center '>
          <Image
            src='/heart.svg'
            alt='points'
            height={22}
            width={22}
            className='mr-2'
          />
          HEARTS: {hearts}
        </div>
      </div>
    </div>
  )
}
