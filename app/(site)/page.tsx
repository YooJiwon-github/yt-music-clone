import { sleep } from '@/lib/utils'
import React from 'react'

const page = async () => {
  console.log("before Home page sleep ...");
  await sleep(4000);
  console.log("after Home page sleep ...");

  return (
    <div>Home Page</div>
  )
}

export default page