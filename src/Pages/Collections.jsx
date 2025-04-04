import React from 'react'
import Title from '../Components/Title'
import { useState, useEffect } from 'react'
import { assets, collections, photos } from '../Utils/data'
import { Link } from 'react-router'
import { capitalize } from 'lodash'


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
    <div className='w-full h-full'>
      <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>
        <Title title={"Collections"} className='' />
        <p>Explore the world through collections of beautiful photos free to use under the <span className='underline font-bold'>Unsplash License.</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto mt-16 '>
          {collectionsAlbums.map( (collection, idx) => (<CollectionCard collection={collection} key={idx}/>) )}
          <AddCollectionCard />
      </div>

    </div>
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
    </Link>
  )
}

function AddCollectionCard() {
  return (
    <div className='cursor-pointer group w-full h-72 bg-fadedLight rounded-md flex flex-col gap-4 items-center justify-center text-fadedSecondary font-bold hover:shadow-lg transition-all duration-300 ease-in-out'>
      <img src={assets.icons.plus} alt="" className='aspect-square w-9 group-hover:animate-bounce transition-all duration-300 ease-in'/>
      <p className='text-xl'>Add new collection</p>
    </div>
  )
}