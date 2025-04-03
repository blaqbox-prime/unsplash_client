import React, { useContext, useEffect, useState } from 'react'
import {photos} from '../Utils/data'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { PhotosContext } from '../Hooks/usePhotos';
// import  from '../Hooks/usePhotos'
import NoPhotosFound from './NoPhotosFound';
import Photo from './Photo'

function Gallery() {

  const ctx = useContext(PhotosContext);
  const [gallaryPhotos, setGalleryPhotos] = useState(photos);
    
  console.log(ctx);

  return (
    <div data-testid="gallery">
         <ResponsiveMasonry 
                data-testid="responsive-masonry"
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry data-testid="masonry-grid" gutter='24px'>
                  {
                    photos.map(photo => <Photo key={photo._id} label={photo.label} url={photo.urls.small}/>)
                  }
                </Masonry>
            </ResponsiveMasonry>
    </div>
  )
}

export default Gallery