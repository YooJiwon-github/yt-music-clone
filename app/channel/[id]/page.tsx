import React from 'react'

const page = (props: any) => {
  console.log(props);

  return (
    <div>channels/[{props.params.id}]</div>
  )
}

export default page;