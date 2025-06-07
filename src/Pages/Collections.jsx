import Title from '../Components/Title'
import { useState, useEffect } from 'react'
import { assets, collections, photos } from '../Utils/data'
import { Link } from 'react-router'
import { capitalize, delay, initial } from 'lodash'
import AddCollectionCard from '../Components/AddCollectionCard'
import { AnimatePresence, motion } from "motion/react"
import { anim, slideIn } from '../Utils/animations'
import AddCollection from '../Components/AddCollection'
import { useQuery } from '@tanstack/react-query'
import { getAllCollections } from '../Utils/api'
import Loading from '../Components/Loading'

function Collections() {

  const {data, error, isLoading} = useQuery({ queryKey: ['collections'], queryFn: getAllCollections })

// console.log(collectionsAlbums)

  if(error){
    return (<h1>This is an error page: {error.message}</h1>)
  }

  return isLoading ? <Loading /> : (
    <main className='w-full h-full'>
      <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>
        <Title title={"Collections"} className='' />
        <p>Explore the world through collections of beautiful photos free to use under the <span className='underline font-bold'>Unsplash License.</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto mt-16 '>
          {data.map( (collection, idx) => (<CollectionCard collection={collection} key={idx}/>) )}
          <AddCollection button={<AddCollectionCard />}/>
      </div>

    </main>
  )
}

export default Collections






function CollectionCard({collection}) {
  
  const coverImages = () => {
    if (collection.images?.length != 0) {
      return collection.images.map((image) => image).slice(0, 3) 
    }
    return [assets.images.placeholder]
  } 

  const coverImagesCount = coverImages().length

  const coverImagesClass = () => {
    if (coverImagesCount === 1) return "singleCover"
    if (coverImagesCount === 2) return "dualCover"
    if (coverImagesCount >= 3) return ""
  }
  
  return (
    <Link to={`/collections/${collection._id}`} className="group">
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
        <p className='text-fadedSecondary'>{`${collection?.images?.length} photos`}</p>
       </div>
        </motion.div>   
        </AnimatePresence>
    </Link>
  )
}

