import React from 'react'
import Title from '../Components/Title'
import { useState, useEffect } from 'react'
import { collections, photos } from '../Utils/data'
import { Link } from 'react-router'
import { capitalize, delay, initial } from 'lodash'
import AddCollectionCard from '../Components/AddCollectionCard'
import { AnimatePresence, motion } from "motion/react"
import { anim, fadeIn, slideIn } from '../Utils/animations'
import AddCollection from '../Components/AddCollection'

function Collections() {

  const [collectionsAlbums, setCollectionsAlbums] = useState([])

useEffect(() => {
  setCollectionsAlbums(
    collections.map((collection) => {
      return {
        ...collection,
        photos: photos.filter((photo) => photo.collectionId === collection.id),
      }
    }
  )
)
}, [])

console.log(collectionsAlbums)


  return (
    <main className='w-full h-full'>
      <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>
        <Title title={"Collections"} className='' />
        <p>Explore the world through collections of beautiful photos free to use under the <span className='underline font-bold'>Unsplash License.</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto mt-16 '>
          {collectionsAlbums.map( (collection, idx) => (<CollectionCard collection={collection} key={idx}/>) )}
          <AddCollection />
      </div>

    </main>
  )
}

export default Collections






function CollectionCard({collection}) {
  
  const coverImages = () => {
    return collection.photos.map((photo) => photo.urls.small).slice(0, 3)
  } 

  const coverImagesCount = coverImages().length

  const coverImagesClass = () => {
    if (coverImagesCount === 1) return "singleCover"
    if (coverImagesCount === 2) return "dualCover"
    if (coverImagesCount === 3) return ""
  }
  
  return (
    <Link to={`/collections/${collection.id}`} className="group">
      <AnimatePresence >

      <motion.div className=""
        {...anim(slideIn)}
        transition={{ duration: 1, ease: "easeOut"}}
      >
      <div className={`collectionCoverGrid rounded-md relative w-full h-72 mb-4 overflow-hidden ${coverImagesClass()} group-hover:shadow-lg transition-all duration-300 ease-in-out` }>
        {
          coverImages().map((image, idx) => (
            <img src={image} key={idx} alt="cover" className={`w-full h-full object-cover img${idx+1}`}/>
          ))
        }
      </div>

       <div className="">
        <h2 className="font-bold">{capitalize(collection.title)}</h2>
        <p className='text-fadedSecondary'>{`${collection?.photos?.length} photos`}</p>
       </div>
        </motion.div>   
        </AnimatePresence>
    </Link>
  )
}

