import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

function Root() {
  return (
    <div className='h-screen mx-auto flex flex-col items-start text-primary'>
      <Header />   
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default Root
