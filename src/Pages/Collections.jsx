import Title from '../Components/Title'
import { useState, useEffect } from 'react'
import { assets} from '../Utils/data'
import { Link } from 'react-router'
import { capitalize } from 'lodash'
import AddCollectionCard from '../Components/AddCollectionCard'
import { AnimatePresence, motion } from "motion/react"
import { anim, slideIn } from '../Utils/animations'
import AddCollection from '../Components/AddCollection'
import { useQuery } from '@tanstack/react-query'
import { getAllCollections } from '../Utils/api'
import Loading from '../Components/Loading'

function Collections() {

    const {data, error, isLoading} = useQuery({ queryKey: ['collections'], queryFn: getAllCollections })

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
                {data.map( (collection, idx) => (<CollectionCard collection={collection} key={collection._id}/>) )}
                <AddCollection button={<AddCollectionCard />}/>
            </div>

        </main>
    )
}

export default Collections






function CollectionCard({collection}) {
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [loadedCount, setLoadedCount] = useState(0)

    const coverImages = () => {
        if (collection.images?.length !== 0) {
            return collection.images.slice(0, 3)
        }
        return [assets.images.placeholder]
    }

    const images = coverImages()
    const coverImagesCount = images.length

    const coverImagesClass = () => {
        if (coverImagesCount === 1) return "singleCover"
        if (coverImagesCount === 2) return "dualCover"
        if (coverImagesCount >= 3) return ""
    }

    // Preload images
    useEffect(() => {
        setImagesLoaded(false)
        setLoadedCount(0)

        const imageElements = images.map(img => {
            const imageElement = new Image()
            imageElement.src = img.url
            return imageElement
        })

        const handleImageLoad = () => {
            setLoadedCount(prev => {
                const newCount = prev + 1
                if (newCount === images.length) {
                    setImagesLoaded(true)
                }
                return newCount
            })
        }

        imageElements.forEach(img => {
            if (img.complete) {
                handleImageLoad()
            } else {
                img.addEventListener('load', handleImageLoad)
                img.addEventListener('error', handleImageLoad) // Handle errors gracefully
            }
        })

        return () => {
            imageElements.forEach(img => {
                img.removeEventListener('load', handleImageLoad)
                img.removeEventListener('error', handleImageLoad)
            })
        }
    }, [collection._id, images])

    return (
        <Link to={`/collections/${collection._id}`} className="group">
            <AnimatePresence mode="wait">
                {!imagesLoaded ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-72 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"
                    >
                        <div className="h-full flex items-center justify-center">
                            <span className="text-gray-400">Loading...</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        {...anim(slideIn)}
                        transition={{ duration: 2, ease: "easeOut", delay: 1}}
                    >
                        <div className={`collectionCoverGrid rounded-md relative w-full h-72 mb-4 overflow-hidden ${coverImagesClass()} group-hover:shadow-lg transition-all duration-300 ease-in-out`}>
                            {
                                images.map((image, idx) => (
                                    <img
                                        src={image.url}
                                        key={image._id}
                                        alt="cover"
                                        className={`w-full h-full object-cover img${idx+1}`}
                                    />
                                ))
                            }
                        </div>

                        <div className="">
                            <h2 className="font-bold">{capitalize(collection.title)}</h2>
                            <p className='text-fadedSecondary'>{`${collection?.images?.length} photos`}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Link>
    )
}