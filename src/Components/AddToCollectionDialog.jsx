import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi';
import IconButton from './IconButton';
import { MdCancel } from 'react-icons/md';
import { assets, collections } from '../Utils/data';
import AddCollection from './AddCollection';

function AddToCollectionDialog() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton icon={<HiPlus />} onClick={() => setIsOpen(true)} text={"Add to Collection"} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <div className="bg-black opacity-60 w-screen h-screen absolute"></div>
          <DialogPanel className="z-50 max-w-2xl space-y-4 border bg-white p-12 w-full">
            <DialogTitle className="font-semibold text-center text-xl mb-10">Add to Collection</DialogTitle>
            <div className="grid grid-cols-3 gap-4 mb-8">
                                {collections.map(collection => (
                                    <div className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-200 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out">
                                        <div className="flex items-center gap-4">
                                            <img src={collection.images[0]} alt="" className="h-10 w-10 object-cover rounded-md"/>
                                            <div>
                                                <p className="font-semibold">{collection.title}</p>
                                                <p className="text-secondary">{collection.images.length} photos</p>
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