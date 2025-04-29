import React from 'react'
import { assets } from '../Utils/data'
import Searchbar from '../Components/Searchbar'
import {motion} from 'motion/react'
import { anim, fadeIn, slideIn, slideInHomeText, widen } from '../Utils/animations'

function Home() {


  return (
    <main className='page w-full'>
      <motion.img
      {...anim(fadeIn)}
      transition={{duration: 0.5, ease: 'easeInOut'}}
      src={assets.images.hero} alt="background" className='w-full h-full object-cover pointer-events-none -z-10'/>
       <motion.div 
       {...anim(fadeIn)}
       transition={{duration: 0.5, ease: 'easeInOut', delay: 0.5}}
       className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-5 transition justify-center w-full text-center max-w-md md:max-w-lg'>
            <h1 className='text-4xl font-bold'>Search</h1>
            <p className='text-secondary'>Search high-resolution images from Unsplash</p>
            <motion.div 
            {...anim(widen)}
            transition={{duration: 1, ease: 'easeOut', delay: 0.8}}
            className='overflow-hidden w-full origin-center'>
              <Searchbar className='w-full' /> 
            </motion.div>
       </motion.div> 
    </main>
  )
}

export default Home
