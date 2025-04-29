import React, {useEffect, useState} from 'react'
import Title from "../Components/Title";
import {photos} from '../Utils/data'
import Gallery from "../Components/Gallery";

function Collection() {

    // const { collectionId } = useParams()
    const [images, setImages] = useState(photos || [])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    useEffect(() => {
    //   get collection images
    
    }, [])
    

  return (
    <main className="w-full h-full">
        <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>
            <Title title={"Collection"} className='' />
            <p>{`${images.length} photos`}</p>
        </div>

        <Gallery images={images} />

    </main>
  )
}

export default Collection
