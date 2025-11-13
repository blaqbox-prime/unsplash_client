import React, {useState} from 'react'
import {FiMinus} from "react-icons/fi";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import Loading from "./Loading";
import {removeImageFromCollection} from "../Utils/api";
import {toast} from "react-toastify";

const BtnRemoveImageFromCollection = ({imageId, collectionId}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRemoveImageFromCollection = async () => {
        setLoading(true)

        const response = await removeImageFromCollection(collectionId, imageId);

        setLoading(false)

        if(response.status === 200){
            toast.success("Image removed from collection");
        } else {
            toast.error("Failed to remove image from collection. Please try again later.")
            console.error(response.statusText);
            console.log(await response.json());
        }
        setIsOpen(false)
    }

    return (
        <>
        <div className="hidden items-center gap-3 font-bold cursor-pointer group-hover:flex hover:text-red-700 dark:hover:text-red-500" onClick={() => setIsOpen(true)} >
                <FiMinus />
                <p>Remove</p>
        </div>
            <Dialog transition open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-md dark:bg-primary dark:text-light  dark:shadow-fadedLight/50 dark:shadow-md ">
                        <DialogTitle className="font-bold text-2xl">Remove image from collection?</DialogTitle>
                        <Description className="text-secondary text-sm dark:text-fadedLight">This will permanently remove this image from the collection</Description>
                        <p className="">Are you sure you want to remove this image from the collection? This action cannot be undone.</p>
                        { !loading ? (<div className="flex gap-4">
                            <button className=" p-2 rounded-md text-white bg-gray-400 hover:bg-gray-600" onClick={() => setIsOpen(false)} disabled={loading}>Cancel</button>
                            <button className=" p-2 rounded-md text-white bg-red-700 hover:bg-red-800" onClick={handleRemoveImageFromCollection} disabled={loading}>Remove</button>
                        </div> ) : <Loading />}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
export default BtnRemoveImageFromCollection
