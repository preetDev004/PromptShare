import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <div className='mt-16 w-full flex justify-center items-center'>
        <Image width={50} height={50} alt="loader" src={"/assets/icons/loader.svg"}/>
    </div>
  )
}

export default loading