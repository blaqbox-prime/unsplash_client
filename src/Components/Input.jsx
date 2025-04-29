import React from 'react'
import { anim, slideIn} from '../Utils/animations';
import { motion } from "motion/react"

function FormInput({children, label, error}) {
  return (
    <div className="flex flex-col gap-2">
    <label htmlFor="email" className='font-semibold'>{label}</label>
    {children}
    {error && <motion.span
        {...anim(slideIn)}
        transition={{ duration: 0.5 }}
        className='text-red-500'>* {error.message}</motion.span>}
</div>
  )
}

export default FormInput
