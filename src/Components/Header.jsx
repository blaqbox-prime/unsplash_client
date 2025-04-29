import React, { useContext, useState } from 'react'
import { MdSearch } from 'react-icons/md'
// import { PhotosContext } from '../Hooks/usePhotos';
import AddPhotoModal from './AddPhotoModal'
import { assets } from '../Utils/data';
import { Link, NavLink, useParams } from 'react-router';
import { capitalize } from 'lodash';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const ctx = useContext(PhotosContext);
  const pathname = useParams().pathName;

  const navlinks = [{ path: "/", title: 'home' }, { path: "/collections", title: 'collections' }, { path: "/sign-in", title: 'sign in' }]


  return (
    <header id="page-header" data-testid="header" className='border-b px-8 w-full' >
      <div className='max-w-screen-2xl mx-auto flex py-3 w-full justify-between'>
        <Link to={"/"} className="left flex ">
          <img src={assets.icons.logo} alt="logo" data-testid="header-logo" />
        </Link>
        <nav className="flex items-center gap-8">
          <ul className='flex gap-8'>

            {navlinks.map((link, idx) => (
              <NavLink to={link.path} key={idx}
              className={({ isActive, isPending, isTransitioning }) => [
                isActive ? 'text-primary bg-fadedLight' : 'text-fadedSecondary',
                isPending ? 'text-fadedSecondary' : 'text-fadedSecondary',
                isTransitioning ? 'text-fadedSecondary' : 'text-fadedSecondary'
              ].join(' ').concat(' transition-all duration-300')}
              >
                <li className='cursor-pointer font-semibold text-primary transition-all duration-200 px-3 py-2 rounded-sm hover:text-primary'>{capitalize(link.title)}</li>
              </NavLink>
            ))}

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header