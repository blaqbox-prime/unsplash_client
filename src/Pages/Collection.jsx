import React, {useEffect, useState} from 'react'
import Title from "../Components/Title";
import {photos} from '../Utils/data'
import Gallery from "../Components/Gallery";
import {useQuery} from "@tanstack/react-query";
import {getAllCollections, getCollection} from "../Utils/api";
import {useParams} from "react-router";
import Loading from "../Components/Loading";

function Collection() {

    const { collectionId } = useParams()
    const {data, error, isLoading} = useQuery({ queryKey: [collectionId], queryFn: () => getCollection(collectionId) })
    console.log(data)
    
if(error) return (<h1>This is an error page: {error.message}</h1>)

  return isLoading ? <Loading /> : (
    <main className="w-full h-full">
        <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>
            <Title title={"Collection"} className='' />
            <p>{`${data.images.length} photos`}</p>
        </div>

        <Gallery images={data.images} />

    </main>
  )
}

export default Collection
