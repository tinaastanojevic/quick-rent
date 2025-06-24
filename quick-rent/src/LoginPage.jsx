import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Input } from "@/components/ui/input"
import { useState, useContext } from 'react';
import { loginUser } from './services/UserService'
import {AuthContext} from './context/AuthContext';

function LoginPage() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let userData = await loginUser(email, password);
        login(userData);
        navigate('/');
    }

    return (
        <form onSubmit={handleLogin}>
            <div className='flex flex-col justify-center items-center m-5 p-2 h-full'>
                <div className='p-5 flex flex-col flex-wrap w-1/3 border-1 border-solid border-[var(--primary)] rounded-md'>
                    <div className=' p-2'>
                        <Input onChange={(e) => setEmail(e.target.value)} className='p-4 m-2 text-[var(--text)]' placeholder='Email' type='email'></Input>
                        <Input onChange={(e) => setPassword(e.target.value)} className='p-4 m-2 text-[var(--text)]' placeholder='Password' type='password'></Input>
                    </div>

                    <button type='submit' className='ml-auto text-xl w-1/3 text-white bg-[var(--primary)] rounded-md p-3 mr-5 hover:bg-[var(--secondary)] cursor-pointer'>Login</button>
                    <label className='p-1 text-[var(--primary)]'>Dont't have an account? <a className='text-blue-600' href='/register'>register  here!</a></label>
                </div>
            </div>
        </form>
    )
}

export default LoginPage