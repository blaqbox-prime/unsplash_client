import React, { useContext, useEffect, useState } from 'react'
import {photos} from '../Utils/data'
// import  from '../Hooks/usePhotos'
import Photo from './Photo'
import Masonry from 'react-masonry-css';
import {motion} from 'motion/react'
import { anim, animScrollTrigger, fadeIn } from '../Utils/animations';

function Gallery({className = ''}) {

  const [galleryPhotos, setGalleryPhotos] = useState(photos);
    
  console.log(galleryPhotos)

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
  };

  

  return (
    <div data-testid="gallery" className={className}>
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            
                {
                  galleryPhotos.map(photo => (
                    <motion.div key={photo._id}
                      {...animScrollTrigger(fadeIn)}
                      transition={{duration: 0.5, ease: 'easeInOut'}}
                    >
                      <Photo label={photo.label} url={photo.urls.small}/>
                    </motion.div>
                  ))
                }
          </Masonry>
      
            
    </div>
  )
}

export default Gallery