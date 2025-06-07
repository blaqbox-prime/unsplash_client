import React from 'react'
import {collections} from "../Utils/data";
import {HiPlus} from "react-icons/hi";
import {FiMinus} from "react-icons/fi";
import {TbDownload} from "react-icons/tb";
import IconButton from '../Components/IconButton';
import AddToCollectionDialog from '../Components/AddToCollectionDialog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';
import { getImage } from '../Utils/api';


function Image() {

    const params = useParams()

    const {data, error, isLoading} = useQuery({ queryKey: [`photos/${params.photoId}`], queryFn: () => getImage(params.photoId) })


    const user = {
        id: 5,
        name: "Michael Baccin",
        username: "michaelbaccin",
        avatar: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
    }

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
                <img src={user.avatar} alt="" className="w-10 h-10 object-cover rounded-full" />
                <h1 className="font-semibold">{user.name}</h1>
            </div>

            <p>Published on October 31, 2023</p>

            <div className="flex items-center gap-4">
                <AddToCollectionDialog />

                <IconButton icon={<TbDownload />} onClick={handleDownload} text={"Download"}/>

            </div>

            <section className="">
                <h1 className="font-semibold text-2xl mt-10">Collections</h1>
                <div className="flex flex-col gap-4">
                    {collections.map(collection => (
                        <div className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <img src={collection.images[0]} alt="" className="h-16 w-16 object-cover rounded-md"/>
                                <div>
                                    <p className="font-semibold">{collection.title}</p>
                                    <p className="text-secondary">{collection.images.length} photos</p>
                                </div>
                            </div>

                            <div className="hidden items-center gap-3 font-bold cursor-pointer group-hover:flex">
                                <FiMinus />
                                <p>Remove</p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

        </section>

    </div>
  )
}

export default Image
