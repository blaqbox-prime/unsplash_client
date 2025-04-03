import React, { useContext, useState } from 'react'
import {MdSearch} from 'react-icons/md'
// import { PhotosContext } from '../Hooks/usePhotos';
import AddPhotoModal from './AddPhotoModal'
import { assets } from '../Utils/data';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const ctx = useContext(PhotosContext);

  return (
    <header id="page-header" data-testid="header" className='flex py-3 w-full justify-between border-b px-8' >
        <div className="left flex ">
          <img src={assets.icons.logo} alt="logo" data-testid="header-logo"/>
        </div>

        <nav className="flex items-center gap-8">
          <ul className='flex gap-8'>
            <li className='cursor-pointer font-semibold text-primary transition-all duration-200 bg-fadedLight px-3 py-2 rounded-sm'>Home</li>
            <li className='cursor-pointer font-semibold hover:text-primary text-fadedSecondary transition-all duration-200 px-3 py-2 rounded-sm'>Collections</li>
            <li className='cursor-pointer font-semibold hover:text-primary text-fadedSecondary transition-all duration-200 px-3 py-2 rounded-sm'>Sign in</li>
          </ul>
        </nav>
        </header>
  )
}

export default Header