import { sleep } from '@/lib/utils'
import React from 'react'

const page = async () => {
  await sleep(4000);

  return (
    <div className='min-h-[600px]'>
      <div className='h-[500px] bg-neutral-700'>
        Home Page
      </div>
    </div>
  )
}

export default page