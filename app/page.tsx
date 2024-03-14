/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import Search from './list-components/Search';
import CurrentlyPlaying from './list-components/CurrentlyPlaying';
import Completed from './list-components/Completed';
import OnHold from './list-components/OnHold';
import Dropped from './list-components/Dropped';
import PlanToPlay from './list-components/PlanToPlay';
import Image from 'next/image';
import ListTypeButton from './list-components/ListTypeButton';

export default function Home() {
    const [selectedList, setSelectedList] = useState('Search')

    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>

            <main className="fixed w-full px-4 py-24 z-50">
                <div className='w-[600px] h-[800px] mx-auto bg-white text-black z-[2] rounded'>
                    <div className="bg-blue-700 w-full h-[120px] p-4 flex items-center justify-center rounded">
                        <p className="text-white text-4xl">{selectedList}</p>
                    </div>
                    {/* Navbar */}
                    <div className="flex justify-evenly items-center w-full relative bg-white border-b-2 border-black">
                        <ListTypeButton listName="Search" setSelectedList={setSelectedList}/>
                        <ListTypeButton listName="Currently Playing" setSelectedList={setSelectedList}/>
                        <ListTypeButton listName="Completed" setSelectedList={setSelectedList}/>
                        <ListTypeButton listName="On Hold" setSelectedList={setSelectedList}/>
                        <ListTypeButton listName="Dropped" setSelectedList={setSelectedList}/>
                        <ListTypeButton listName="Plan to Play" setSelectedList={setSelectedList}/>
                    </div>
                    {/* List */}
                    {selectedList === 'Search' ? (
                        <Search />
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
