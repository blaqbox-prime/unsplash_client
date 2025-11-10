import React from 'react'
import {TbDownload} from "react-icons/tb";
import IconButton from '../Components/IconButton';
import AddToCollectionDialog from '../Components/AddToCollectionDialog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';
import { getImage } from '../Utils/api';
import CollectionsWithImage from "../Components/CollectionsWithImage";
import {format} from "date-fns";


function Image() {

    const params = useParams()

    const {data, error, isLoading} = useQuery({ queryKey: [`photos/${params.photoId}`], queryFn: () => getImage(params.photoId) })

    function handleDownload() {
        alert("We Downloading ur pic please wait")
    }

    if (error) {
        return <h1>{error.message}</h1>
    }

    return isLoading ? <Loading /> : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full py-10">
        {/*Image*/}
        <div className="w-full overflow-hidden rounded-md max-h-[90vh]">
            <img src={data.url}
                 alt=""
                 className="w-full h-full object-cover"
            />
        </div>
        {/* Details   */}
        <section className="space-y-5">
            <div className="flex items-center gap-2">
                <img src={data.profile.avatar} alt="" className="w-10 h-10 object-cover rounded-full" />
                <h1 className="font-semibold">{data.profile.fullName}</h1>
            </div>

            <p>Published on {format(data.date_added, "MMMM dd, yyyy")}</p>

            <div className="flex items-center gap-4">
                <AddToCollectionDialog imageId={params.photoId} />

                <IconButton icon={<TbDownload />} onClick={handleDownload} text={"Download"}/>

            </div>

           < CollectionsWithImage imageId={params.photoId} />

        </section>

    </div>
  )
}

export default Image
