/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            // await logIn(email, password)
            // navigate('/netflix_clone')
        } catch (error) {
            // setErrorMessage(error?.message ?? 'Unknown Error')
        }
    }

    return (
        <div>
            <img className='hidden sm:block absolute w-full h-full object-cover' src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>

            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[550px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        {errorMessage && (
                            <div className='mt-3 p-3 bg-red-400'>
                                <p className=''>{errorMessage}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                            <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='p-3 my-2 bg-gray-700 rounded' 
                            type="email" 
                            placeholder='Email' 
                            autoComplete='email' 
                            />
                            <input
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-3 my-2 bg-gray-700 rounded' 
                            type="password" 
                            placeholder='Password' 
                            autoComplete='current-password' 
                            />
                            <button className='bg-blue-700 py-3 my-6 rounded font-bold'>Sign In</button>
                            <div className='flex justify-between items-center text-sm text-gray-300'>
                                <p><input className='mr-2' type="checkbox" />Remember me</p>
                                <p>Need Help?</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}