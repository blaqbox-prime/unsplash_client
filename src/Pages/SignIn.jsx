import Title from '../Components/Title'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { motion } from "motion/react"
import { anim, slideIn, tap } from '../Utils/animations';
import { assets } from '../Utils/data';
import { Link } from 'react-router';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();



function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const {loading, login} = useAuth();
    const navigator = useNavigate()

    const onSubmit = (data) => {
        console.log(data)

        try {
            login(data.email, data.password)
            toast.success("Logged in successfully!")
            navigator("/",{replace:true});
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }
        
    }


    return (

        <div className='text-center mt-16 max-w-sm mx-auto flex flex-col gap-4 '>

            <motion.div
                {...anim(slideIn)}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="top flex flex-col gap-2 items-center mb-4">
                <img src={assets.icons.logo} alt="" />
                <Title title={"Sign In"} className='p-2' />
                <p>Explore the world through collections of beautiful photos free to use under the <span className='underline font-bold'>Unsplash License.</span></p>

            </motion.div>

            <motion.form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 mt-8 text-left'
                {...anim(slideIn)}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input {...register("email")} placeholder="Email" className='border-2 border-gray-300 p-2 rounded-md' />
                    {errors.email && <motion.span
                        {...anim(slideIn)}
                        transition={{ duration: 0.5 }}
                        className='text-red-500'>* {errors.email.message}</motion.span>}
                </div>

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
                        disabled={loading}
                        type="submit" className='bg-primary text-light p-2 rounded-md flex items-center justify-center transition-all'>{!loading ? "Sign In" : <Loading />}</motion.button>
                    <Link to={"/sign-up"} className='text-center'>
                        <motion.button
                            {...anim(tap)}
                            type="button" className='bg-transparent text-black p-2 rounded-md'>Don't have an account? <span className='font-bold underline'>Sign Up</span></motion.button>
                    </Link>
                </div>
            </motion.form>

        </div>
    )
}

export default SignIn
