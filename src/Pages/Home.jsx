import React from 'react'
import { assets } from '../Utils/data'

function Home() {
  return (
    <main className='page px-8 w-full'>
      <img src={assets.images.hero} alt="background" className='w-full h-full object-cover pointer-events-none -z-10'/>
       <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-5 transition justify-center w-full text-center max-w-md md:max-w-lg'>
            <h1 className='text-4xl font-bold'>Search</h1>
            <p className='text-secondary'>Search high-resolution images from Unsplash</p>
            <div className='flex items-center justify-between w-full gap-4 border border-light rounded-md p-3 shadow-sm transition-all duration-200'>
                <input type="text" placeholder='Enter your keywords...'  className='font-light placeholder:italic flex flex-1 outline-none'/>
                <img src={assets.icons.search} alt="ssearch" className='aspect-square '/>
            </div>
       </div> 
    </main>
  )
}

export default Home
