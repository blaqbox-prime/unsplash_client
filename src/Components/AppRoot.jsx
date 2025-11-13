import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Searchbar from "./Searchbar";
import {assets} from "../Utils/data";

function AppRoot() {
  return (
    <div className='min-h-screen mx-auto flex flex-col items-start text-primary relative dark:bg-primary'>
      <Header />   
      <div className="relative w-full flex flex-col items-start">
          <img src={assets.images.hero} alt="ribbon" className='fixed object-cover w-screen h-screen overflow-hidden transition-all duration-200 opacity-5 grayscale pointer-events-none'/>
          <div className="relative flex flex-col items-start mx-auto">
              <main className='px-8 max-w-screen-2xl w-full mx-auto relative'>
                  <Outlet />
              </main>
          </div>
      </div>
    </div>
  )
}

export default AppRoot
