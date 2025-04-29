import React from 'react'
import Title from '../Components/Title'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { motion } from "motion/react"
import { anim, slideIn, tap } from '../Utils/animations';
import { assets } from '../Utils/data';
import { Link, redirect } from 'react-router';
import FormInput from '../Components/Input';
import { toast } from 'react-toastify';

const schema = yup.object({
    firstName: yup.string().required().max(30),
    lastName: yup.string().required().max(50),
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

function SignUp() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {

        console.log(data);

        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log(data);
            sessionStorage.setItem("jwt", JSON.stringify(data.token))
            toast.success("Account created successfully!")
            reset()
            redirect("/sign-in")
        }).catch(err => {
            console.log(err);
            toast.error(err)
        })

    }


    return (

        <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>

            <motion.div
                {...anim(slideIn)}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="top flex flex-col gap-2 items-center mb-4">
                <img src={assets.icons.logo} alt="" />
                <Title title={"Create an account"} className='p-2' />
                <p>Join the world of photography through collections of beautiful photos free to use under the <span className='underline font-bold'>Unsplash License.</span></p>

            </motion.div>

            <motion.form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 mt-8 text-left'
                {...anim(slideIn)}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
            >

                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="First Name" error={errors.firstName}>
                        <input {...register("firstName")} placeholder="First Name" className='border-2 border-gray-300 p-2 rounded-md' />
                    </FormInput>

                    <FormInput label="Last Name" error={errors.lastName}>
                        <input {...register("lastName")} placeholder="Last Name" className='border-2 border-gray-300 p-2 rounded-md' />
                    </FormInput>

                </div>

                <FormInput label="Email" error={errors.email}>
                    <input {...register("email")} placeholder="Email" className='border-2 border-gray-300 p-2 rounded-md' />
                </FormInput>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input {...register("password")} type="password" placeholder="Password" className='border-2 border-gray-300 p-2 rounded-md' />
                    {errors.password && <motion.span
                        {...anim(slideIn)}
                        transition={{ duration: 0.5 }}
                        className='text-red-500'>* {errors.password.message}</motion.span>}
                </div>

                <div className="flex flex-col gap-2">
                    <motion.button
                        {...anim(tap)}
                        type="submit" className='bg-primary text-light p-2 rounded-md'>Sign Up</motion.button>
                    <Link to={"/sign-in"} className='text-center'>
                        <motion.button
                            {...anim(tap)}
                            type="button" className='bg-transparent text-black p-2 rounded-md'>Already have an account? <span className='font-bold underline'>Sign In</span></motion.button>
                    </Link>
                </div>
            </motion.form>

        </div>
    )
}

export default SignUp
