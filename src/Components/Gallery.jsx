import React, { useContext, useEffect, useState } from 'react'
import {photos} from '../Utils/data'
// import  from '../Hooks/usePhotos'
import Photo from './Photo'
import Masonry from 'react-masonry-css';

function Gallery({className = ''}) {

  const [galleryPhotos, setGalleryPhotos] = useState(photos);
    
  console.log(galleryPhotos)

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div data-testid="gallery" className={className}>
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            
                {
                  galleryPhotos.map(photo => (<Photo key={photo._id} label={photo.label} url={photo.urls.small}/>))
                }
          </Masonry>
      
            
    </div>
  )
}

export default Gallery