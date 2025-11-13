import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {useEffect, useState} from 'react'
import { HiPlus } from 'react-icons/hi';
import IconButton from './IconButton';
import { MdCancel } from 'react-icons/md';
import AddCollection from './AddCollection';
import {useQuery} from "@tanstack/react-query";
import {addImageToCollection, getAllCollections} from "../Utils/api";
import Loading from "./Loading";
import {assets} from "../Utils/data";
import {toast} from "react-toastify";

function AddToCollectionDialog({imageId}) {
    const {data, error, isLoading} = useQuery({ queryKey: ['collections'], queryFn: getAllCollections })
    let [isOpen, setIsOpen] = useState(false)
    let [actionLoading, setActionLoading] = useState(false)

    const [collections, setCollections] = useState([]);
    useEffect(() => {
        if(data && !isLoading){
            setCollections(data.filter(col => !col.images.some(img => img._id === imageId)));
        }
    }, [data, imageId, isLoading]);    console.log(data);

    const handleAddToCollection = async (selectedCollection) => {
        setActionLoading(true);
        const res = await addImageToCollection(selectedCollection._id, imageId);
        setActionLoading(false);

        if (res.status === 200){
            toast.success(`Image added to ${selectedCollection.title} collection`);
        } else {
            toast.error(`Failed to add image to ${selectedCollection.title} collection. Please try again later.`);
        }
        setIsOpen(false);
    }

    if(error){
      return console.log(<h1>This is an error page: {error.message}</h1>)
    }

  return isLoading ? <Loading /> : (
    <>
      <IconButton icon={<HiPlus />} onClick={() => setIsOpen(true)} text={"Add to Collection"} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <div className="bg-black opacity-60 w-screen h-screen absolute"></div>
          {/*  className="max-w-lg space-y-4 border bg-white p-12 rounded-md dark:bg-primary dark:text-light  dark:shadow-fadedLight/50 dark:shadow-md " */}
          <DialogPanel className="overflow-y-scroll z-50 max-w-2xl max-h-[80vh] space-y-4 border bg-white p-12 transition-all duration-200
          rounded-md dark:bg-primary dark:text-light  dark:shadow-fadedLight/50 dark:shadow-md scroll-smooth no-scrollbar
          ">
            <DialogTitle className="font-semibold text-center text-xl mb-10 ">Add to Collection</DialogTitle>
            <div className="grid grid-cols-3 gap-4 mb-8">
                                {collections.length > 0 && collections.map(collection => (
                                    <div key={collection._id} className={`group flex items-center justify-between p-2 rounded-md hover:bg-gray-200 dark:hover:bg-light/70 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out
                                    ${actionLoading && "pointer-events-none opacity-50 cursor-not-allowed"}
                                    `}
                                         onClick={() => handleAddToCollection(collection)}
                                        aria-disabled={actionLoading}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={collection.images[0].url} alt="" className="h-10 w-10 object-cover rounded-md"/>
                                            <div>
                                                <p className="font-semibold line-clamp-2 text-ellipsis dark:group-hover:text-primary">{collection.title}</p>
                                                <p className="text-secondary ">{collection.images.length} photos</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <AddCollection 
                                button={<div className="p-4 cursor-pointer group w-full bg-fadedLight rounded-md flex gap-4 items-center justify-center text-fadedSecondary font-bold hover:shadow-lg transition-all duration-300 ease-in-out">
                                            <img src={assets.icons.plus} alt="" className='aspect-square w-4 group-hover:animate-bounce transition-all duration-300 ease-in'/>
                                    
                                    <p>New Collection</p>
                                </div>}
                                />
                            </div>
            <div className="flex gap-4 justify-end">
              <IconButton icon={<MdCancel />} text={"Cancel"} onClick={() => setIsOpen(false)} className="bg-red-600 hover:bg-red-700 text-white"/>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default AddToCollectionDialog;