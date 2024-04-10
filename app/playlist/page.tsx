import React from 'react'

const page = (props: any) => {
  console.log(props);
  return (
    <div>playlist {props.searchParams.list}</div>
  )
}

export default page