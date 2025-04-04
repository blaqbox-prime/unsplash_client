import React from 'react'
import { assets } from '../Utils/data'
import Searchbar from '../Components/Searchbar'
import Gallery from '../Components/Gallery'

function SearchResults() {
  return (
    <main className='flex flex-col items-center'>
      <img src={assets.images.gradientBg2} alt="" />
      <Searchbar className='w-5/12 shadow-lg -mt-6 bg-white'/> 
      <Gallery className="mt-12 min-w-full px-8 mx-auto"/>
    </main>
  )
}

export default SearchResults
