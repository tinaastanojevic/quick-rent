import React from 'react'
import { useForm, } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { registerUser } from './services/UserService'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import {AuthContext} from './context/AuthContext';


export default function RegisterPage() {
    const { register, handleSubmit } = useForm();

    const { register: registerFromContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async (data) => {

        let userData = await registerUser(data);
        registerFromContext(userData);
        navigate('/');
    }

    return (
        <>
            <div>RegisterPage</div>
            <form onSubmit={handleSubmit(submit)}>
                <div className='flex flex-col justify-center items-center m-5 p-2 h-full'>
                    <div className='p-5 flex flex-col flex-wrap w-1/3 border-1 border-solid border-[var(--primary)] rounded-md'>
                        <div className=' p-2'>
                            <Input {...register("username", {
                                required: true,
                                minLength: 4
                            })} className='p-4 m-2 text-[var(--text)]' placeholder='Username' type='text'></Input>
                            <Input {...register("email", {
                                required: true
                            })} className='p-4 m-2 text-[var(--text)]' placeholder='Email' type='email'></Input>
                            <Input {...register("password", {
                                required: true,
                                minLength: 6
                            })} className='p-4 m-2 text-[var(--text)]' placeholder='Password' type='password'></Input>
                            <select defaultValue="" className='p-2 m-1 w-full text-[var(--text)] bg-[var(--secondary)]' {...register("role", {
                                required: true
                            })}>
                                <option value="" disabled hidden>Select a Role</option>
                                <option value='Customer'>Customer</option>
                                <option value='Owner'>Owner</option>
                            </select>
                        </div>


                        <button type='submit' className='ml-auto text-xl w-1/3 text-white bg-[var(--primary)] rounded-md p-3 mr-5 hover:bg-[var(--secondary)] cursor-pointer'>Register</button>
                        <label className='p-1 m-1 text-[var(--primary)]'>Already have an account? <a className='text-blue-600' href='/login'>login  here!</a></label>
                    </div>
                </div>
            </form>
        </>

    )
}
