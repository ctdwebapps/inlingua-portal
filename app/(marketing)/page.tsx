import { Button } from '@/components/ui/button'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2'>
      <div className='relative w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] mb-8 lg:mb-0'>
        <Image src='/inlingua.svg' fill alt='Hero' />
      </div>
      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center'>
          Language Made Easy: Connect with Confidence!
        </h1>
        <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
          <ClerkLoading>
            <Loader2 className='h-5 w-5 text-muted-foreground animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode='modal' forceRedirectUrl='/languages'>
                <Button
                  size='lg'
                  variant='primaryOutline'
                  className='w-full'
                  aria-label='Login to your account'
                >
                  LOGIN
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size='lg'
                variant='secondary'
                className='w-full bg-orange-600 hover:bg-orange-500/90 border-orange-700 '
                asChild
                aria-label='Continue'
              >
                <Link href='/languages'>Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
