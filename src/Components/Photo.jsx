import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import {Link} from "react-router";


function Photo({_id, label, url}) {

    const [isShowing,setShowing] = useState(false)

    setTimeout(() => {
        setShowing(true);
    },800);


  return (
    

    <Link to={`/photos/${_id}`} >
        <div className='photo-container hover:cursor-pointer relative shadow-md brightness-95  hover:brightness-110 transition-all duration-300' data-testid="photo-container" >
            <img src={url || ""} alt={label || "image"}
                 className='Photo transition duration-500 object-cover object-center w-full h-full hover:scale-105'
            />
        </div>
    </Link>
  )
}

export default Photo