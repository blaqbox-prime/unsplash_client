import React from 'react'
import {FiMinus} from "react-icons/fi";
import {useQuery} from "@tanstack/react-query";
import {getAllCollectionsWithImageId} from "../Utils/api";
import Loading from "./Loading";
import {Link} from "react-router";
import BtnRemoveImageFromCollection from "./BtnRemoveImageFromCollection";


const CollectionsWithImage = ({imageId}) => {

    const {data, error, isLoading} = useQuery({queryKey: [`collections/including/${imageId}`], queryFn: () => getAllCollectionsWithImageId(imageId) })

    if(error) {
        console.error(error)
        return null
    }

    return isLoading ? <Loading /> : (
        <section className="">
            <h1 className="font-semibold text-2xl mt-10 mb-5">Collections</h1>
            <div className="flex flex-col gap-4">
                {data.map(collection => (
                    <div className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-200 dark:hover:bg-light/30 transition-all duration-300 dark:text-light ">
                        <Link to={`/collections/${collection._id}`}>
                            <div className="flex items-center gap-4 cursor-pointer">
                                <img src={collection.images[0].url} alt="" className="h-16 w-16 object-cover rounded-md"/>
                                <div>
                                    <p className="font-semibold">{collection.title}</p>
                                    <p className="text-secondary dark:text-fadedLight">{collection.images.length} photos</p>
                                </div>
                            </div>
                        </Link>

                       <BtnRemoveImageFromCollection imageId={imageId} collectionId={collection._id} />

                    </div>
                ))}
            </div>
        </section>
    )
}
export default CollectionsWithImage
