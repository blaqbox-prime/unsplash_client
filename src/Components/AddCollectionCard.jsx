import { tap } from "../Utils/animations";
import { assets } from "../Utils/data";
import {motion} from 'motion/react'

function AddCollectionCard() {
    return (
      <motion.div 
      whileTap={tap}
      className='cursor-pointer group w-full h-72 bg-fadedLight rounded-md flex flex-col gap-4 items-center justify-center text-fadedSecondary font-bold hover:shadow-lg transition-all duration-300 ease-in-out'>
        <img src={assets.icons.plus} alt="" className='aspect-square w-9 group-hover:animate-bounce transition-all duration-300 ease-in'/>
        <p className='text-xl'>Add new collection</p>
      </motion.div>
    )
  }

  export default AddCollectionCard;