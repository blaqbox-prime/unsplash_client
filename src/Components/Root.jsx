import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

function Root() {
  return (
    <div className='h-screen max-w-[1920px] mx-auto flex flex-col items-start text-primary'>
      <Header />   
      <Outlet />
    </div>
  )
}

export default Root
