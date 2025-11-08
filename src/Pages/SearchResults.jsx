import React, {useEffect, useState} from 'react'
import { assets } from '../Utils/data'
import Searchbar from '../Components/Searchbar'
import Gallery from '../Components/Gallery'
import {photos} from '../Utils/data'
import { useParams } from 'react-router'
import { searchImages } from '../Utils/api'
import { useSearchParams } from 'react-router'

function SearchResults() {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      
      const getData = async () => {
        setLoading(true)
        const {data, error} = await searchImages(searchParams.get("query"));
        error ? alert(error) : setImages(data);
        console.log(data, error);
        setLoading(false);
      }
      
      getData();
      
    }, [searchParams])
    

  return (
    <main className='flex flex-col items-center'>
      <img src={assets.images.gradientBg2} alt="ribbon" className='absolute w-full -z-10 h-[120px]'/>
      <Searchbar className='w-full md:w-5/12 shadow-lg bg-white mt-[86px]'/> 
      {loading ? <h1 className='mt-10 text-lg font-bold mx-auto text-center'>loading...</h1> : <Gallery images={images} />}
    </main>
  )
}

export default SearchResults
