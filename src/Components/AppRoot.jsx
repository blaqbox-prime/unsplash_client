import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

function AppRoot() {
  return (
    <div className='h-screen mx-auto flex flex-col items-start text-primary relative'>
      <Header />   
      <main className='px-8 max-w-screen-2xl w-full mx-auto '>
        <Outlet />
      </main>
    </div>
  )
}

export default AppRoot
