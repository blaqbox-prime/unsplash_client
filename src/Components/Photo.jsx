import React, { useState } from 'react'
import { Transition } from '@headlessui/react'


function Photo({id, label, url}) {

    const [isShowing,setShowing] = useState(false)

    setTimeout(() => {
        setShowing(true);
    },800);

    console.log({id,label,url})

  return (
    <Transition
     show={isShowing}
     enter="transform transition duration-[500ms] delay-[200ms]"
     enterFrom="opacity-0 scale-50"
     enterTo="opacity-100 scale-100"
     leave="transform duration-[500ms] transition ease-in-out"
     leaveFrom="opacity-100 scale-100 "
     leaveTo="opacity-0 scale-95 "
    >

    <div className='photo-container hover:cursor-pointer relative shadow-md brightness-95  hover:brightness-110 transition-all duration-300' data-testid="photo-container" >
        {/* <button className='delete-photo absolute top-4 right-4 text-red-600 border border-red-600 z-10' >
            delete
        </button> */}
        {/* <p className="photo-label absolute bottom-4 left-4 w-9/12 text-ellipsis text-white z-10">{label || ""}</p> */}
        <img src={url || ""} alt={label || "image"}
         className='Photo transition duration-500 object-cover object-center w-full h-full'
         />
    </div>
    </Transition>
  )
}

export default Photo