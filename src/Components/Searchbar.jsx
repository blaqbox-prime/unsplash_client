import React from 'react'
import { assets } from '../Utils/data'

function Searchbar({className = ''}) {
  return (
    <div className={`flex items-center justify-between gap-4 border border-light rounded-md p-3 shadow-sm transition-all duration-200 ${className}`}>
                <input type="text" placeholder='Enter your keywords...'  className='font-light placeholder:italic flex flex-1 outline-none'/>
                <img src={assets.icons.search} alt="ssearch" className='aspect-square '/>
            </div>
  )
}

export default Searchbar
