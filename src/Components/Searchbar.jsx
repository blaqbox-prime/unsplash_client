import React from 'react'
import { assets } from '../Utils/data'
import { Form } from 'react-router'

function Searchbar({className = ''}) {
  return (
    <Form action='/search' className={`flex items-center justify-between gap-4 border border-light rounded-md p-3 shadow-sm transition-all duration-200 ${className}`}>
                <input type="text" name='query' placeholder='Enter your keywords...'  className='font-light placeholder:italic flex flex-1 outline-none'/>
                <img src={assets.icons.search} alt="ssearch" className='aspect-square '/>
            </Form>
  )
}

export default Searchbar
