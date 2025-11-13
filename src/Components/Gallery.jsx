import React, { useContext, useEffect, useState } from 'react'
import {photos} from '../Utils/data'
import Photo from './Photo'
import Masonry from 'react-masonry-css';
import {motion} from 'motion/react'
import { animScrollTrigger, fadeIn } from '../Utils/animations';

function Gallery({images = [],className = ''}) {
    
  console.log(images)

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
  };

  

  return (
    <div data-testid="gallery" className={`mt-12 min-w-full px-8 mx-auto ${className}`}>
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            
                {
                  images.map(photo => (
                    <motion.div key={photo._id}
                      {...animScrollTrigger(fadeIn)}
                      transition={{duration: 0.5, ease: 'easeInOut'}}
                        className="transition-all duration-200 rounded-md overflow-clip"
                    >
                      <Photo label={photo.label} url={photo.url} _id={photo._id}/>
                    </motion.div>
                  ))
                }
          </Masonry>
      
            
    </div>
  )
}

export default Gallery