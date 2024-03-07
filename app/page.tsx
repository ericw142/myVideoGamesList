/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import AllGames from './list-components/AllGames';
import CurrentlyPlaying from './list-components/CurrentlyPlaying';
import Completed from './list-components/Completed';
import OnHold from './list-components/OnHold';
import Dropped from './list-components/Dropped';
import PlanToPlay from './list-components/PlanToPlay';
import Image from 'next/image';

export default function Home() {
    const [selectedList, setSelectedList] = useState('All Games')

    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>

            <main className="fixed w-full px-4 py-24 z-50">
                <div className='w-[600px] h-[800px] mx-auto bg-white/90 text-black z-[2]'>
                    <div className="bg-blue-700 w-full h-[120px] p-4 flex items-center justify-center">
                        <p className="text-white text-4xl">My List</p>
                    </div>
                    {/* Navbar */}
                    <div className="flex justify-evenly items-center w-full relative bg-white">
                        <div>
                            <button
                                className="h-[30px] border-solid border-r-2 border-black p-2"
                                onClick={() => setSelectedList('All Games')}
                            >
                                    <p className='text-[14px]'>All Games</p>
                            </button>
                        </div>
                        <div>
                            <button
                                className="h-[30px] border-solid border-r-2 border-black p-2"
                                onClick={() => setSelectedList('Currently Playing')}
                            >
                                <p className='text-[14px]'>Currently Playing</p>
                            </button>
                        </div>
                        <div>
                            <button
                                className="h-[30px] border-solid border-r-2 border-black p-2"
                                onClick={() => setSelectedList('Completed')}
                            >
                                <p className='text-[14px]'>Completed</p>
                            </button>
                        </div>
                        <div>
                            <button
                                className="h-[30px] border-solid border-r-2 border-black p-2"
                                onClick={() => setSelectedList('On Hold')}
                            >
                                <p className='text-[14px]'>On Hold</p>
                            </button>
                        </div>
                        <div>
                            <button
                                className="h-[30px] border-solid border-r-2 border-black p-2"
                                onClick={() => setSelectedList('Dropped')}
                            >
                                <p className='text-[14px]'>Dropped</p>
                            </button>
                        </div>
                        <div>
                            <button
                                className="h-[30px] p-2"
                                onClick={() => setSelectedList('Plan to Play')}
                            >
                                <p className='text-[14px]'>Plan to Play</p>
                            </button>
                        </div>
                    </div>
                    {/* List */}
                    {selectedList === 'All Games' ? (
                        <AllGames />
                    ) : selectedList === 'Currently Playing' ? (
                        <CurrentlyPlaying />
                    ) : selectedList === 'Completed' ? (
                        <Completed />
                    ) : selectedList === 'On Hold' ? (
                        <OnHold />
                    ) : selectedList === 'Dropped' ? (
                        <Dropped />
                    ) : selectedList === 'Plan to Play' ? (
                        <PlanToPlay />
                    ) : <></>}
                </div>
            </main>
        </div>
    );
}
