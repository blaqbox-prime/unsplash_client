import React from 'react'
import { Dialog, DialogTitle, Input } from '@headlessui/react'
import { useState } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { anim, scaleIn } from '../Utils/animations'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/AuthContext'
import Loading from './Loading'


function AddCollection({button}) {
    const [isOpen, setIsOpen] = useState(false)
    const [collectionName, setCollectionName] = useState("")

    const {authFetch, loading, user} = useAuth()  

    const handleSave = async () => {
        try {
            const response = await authFetch("/collections", {
                method: "POST",
                body: JSON.stringify({author: user?.username, title: collectionName}),
                headers: {
                    "Content-Type" :'application/json'
                }
            })
            console.log(response)
            toast.success("Collection Created")

        } catch (error) {
            console.log(error)
            toast.error(error)            
        }
        setIsOpen(false)

    }

    const handleCancel = () => {
        setIsOpen(false)
    }


    return (
        <AnimatePresence mode='wait'>
            <div onClick={() => setIsOpen(true)}>
                {button}
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-40">
                <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4">
                    <div className="bg-black w-screen h-screen absolute opacity-60"></div>
                    <motion.DialogPanel
                        {...anim(scaleIn)}
                        transition={{duration: 0.5, ease: 'easeInOut',}}
                    className=" w-full max-w-xl border bg-white p-8 rounded-lg z-50 transition-all duration-200 shadow-lg">
                        <DialogTitle className="font-semibold text-center text-xl mb-10">Add Collection</DialogTitle>
                    
                        <Input name='collectionName' placeholder="Enter collection name..."
                        value={collectionName} onChange={(e) => setCollectionName(e.target.value)}
                        className="active:outline-secondary focus:outline-secondary  placeholder:italic w-full border border-light rounded-md p-3 shadow-sm transition-all duration-200" />
                        <div className="flex gap-4 justify-center mt-4">
                            <button className="cursor-pointer font-semibold text-primary transition-all duration-200 bg-fadedLight px-6 py-2 rounded-sm" disabled={loading} onClick={handleSave}>{!loading ? "Save" : <Loading />}</button>
                            <button className="cursor-pointer font-semibold text-primary transition-all duration-200 px-6 py-2 rounded-sm" onClick={handleCancel}>Cancel</button>
                        </div>
                    </motion.DialogPanel>
                </div>
            </Dialog>
        </AnimatePresence>
    )
}

export default AddCollection
