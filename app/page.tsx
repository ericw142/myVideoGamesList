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
    const [selectedList, setSelectedList] = useState('Completed')
    const lists = ['Search', 'Currently Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'];

    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/myVideoGamesList/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>

            <main className="fixed w-full px-4 py-24 z-50">
                <div className='w-[600px] h-[800px] mx-auto bg-white text-black z-[2] rounded'>
                    <div className="bg-blue-700 w-full h-[120px] p-4 flex items-center justify-center rounded-tl rounded-tr">
                        <p className="text-white text-4xl font-semibold">{selectedList}</p>
                    </div>
                    <div className="flex justify-evenly items-center w-full relative bg-white border-b-2 border-black">
                        {lists.map((list, i) => {
                            return <ListTypeButton key={`list-${list}-${i}`} listName={list} setSelectedList={setSelectedList}/>
                        })}
                    </div>
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
