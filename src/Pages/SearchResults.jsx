import React, { useState} from 'react'
import { assets } from '../Utils/data'
import Searchbar from '../Components/Searchbar'
import Gallery from '../Components/Gallery'
import { searchImages } from '../Utils/api'
import { useSearchParams } from 'react-router'
import {useQuery} from "@tanstack/react-query";
import Loading from "../Components/Loading";
import Error from "./Error";

function SearchResults() {

    // eslint-disable-next-line no-unused-vars
    const [images, setImages] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, error, isLoading} = useQuery({queryKey:[`photos/query=${searchParams.get("query")}`], queryFn: () => searchImages(searchParams.get("query"))})

    // useEffect(() => {
    //
    //   const getData = async () => {
    //     setLoading(true)
    //     const {data, error} = await searchImages(searchParams.get("query"));
    //     error ? alert(error) : setImages(data);
    //     console.log(data, error);
    //     setLoading(false);
    //   }
    //
    //   getData();
    //
    // }, [searchParams])
    
    if (error) return <Error />

  return isLoading ? <Loading /> : (
    <main className='flex flex-col items-center'>
      <img src={assets.images.gradientBg2} alt="ribbon" className='absolute w-full h-[50px] md:h-[100px] z-10 transition-all duration-200 invert'/>
      <Searchbar className='w-full md:w-6/12 shadow-lg bg-white mt-[24px] md:mt-[80px] z-20 dark:bg-primary'/>
      {loading ? <h1 className='mt-10 text-lg font-bold mx-auto text-center'>loading...</h1> : <Gallery images={data} />}
    </main>
  )
}

export default SearchResults
