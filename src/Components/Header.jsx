import React, { useContext, useState } from 'react'
import {MdSearch} from 'react-icons/md'
// import { PhotosContext } from '../Hooks/usePhotos';
import AddPhotoModal from './AddPhotoModal'
import { assets } from '../Utils/data';
import { Link } from 'react-router';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const ctx = useContext(PhotosContext);

  return (
    <header id="page-header" data-testid="header" className='border-b px-8 w-full' >
        <div className='max-w-screen-2xl mx-auto flex py-3 w-full justify-between'>
          <Link to={"/"} className="left flex ">
            <img src={assets.icons.logo} alt="logo" data-testid="header-logo"/>
          </Link>
          <nav className="flex items-center gap-8">
            <ul className='flex gap-8'>
              <Link to="/">
                <li className='cursor-pointer font-semibold text-primary transition-all duration-200 bg-fadedLight px-3 py-2 rounded-sm'>Home</li>
              </Link>
              <Link to={'/collections'}>
                <li className='cursor-pointer font-semibold hover:text-primary text-fadedSecondary transition-all duration-200 px-3 py-2 rounded-sm'>Collections</li>
              </Link>
              <Link to={'/signin'}>
                <li className='cursor-pointer font-semibold hover:text-primary text-fadedSecondary transition-all duration-200 px-3 py-2 rounded-sm'>Sign in</li>
              </Link>
            </ul>
          </nav>
        </div>
        </header>
  )
}

export default Header