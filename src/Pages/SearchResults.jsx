import React from 'react'
import { assets } from '../Utils/data'
import Searchbar from '../Components/Searchbar'
import Gallery from '../Components/Gallery'

function SearchResults() {
  return (
    <main className='flex flex-col items-center'>
      <img src={assets.images.gradientBg2} alt="ribbon" className='absolute w-full -z-10 h-[120px]'/>
      <Searchbar className='w-full md:w-5/12 shadow-lg bg-white mt-[86px]'/> 
      <Gallery className="mt-12 min-w-full px-8 mx-auto"/>
    </main>
  )
}

export default SearchResults
