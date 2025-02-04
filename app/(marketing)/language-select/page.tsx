import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LanguageSelect = () => {
  return (
    <div>
      <h1>Language Select</h1>
      <Link href='/learn'>
        <Button>select</Button>
      </Link>
    </div>
  )
}

export default LanguageSelect
