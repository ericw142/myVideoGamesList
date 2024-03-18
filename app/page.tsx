/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from 'react'
import Search from './list-components/Search';
import CurrentlyPlaying from './list-components/CurrentlyPlaying';
import Completed from './list-components/Completed';
import OnHold from './list-components/OnHold';
import Dropped from './list-components/Dropped';
import PlanToPlay from './list-components/PlanToPlay';
import Image from 'next/image';
import ListTypeButton from './list-components/ListTypeButton';
import DetailedView from './discover/components/DetailedView';

export default function Home() {
    const [selectedList, setSelectedList] = useState('Currently Playing')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const lists = ['Search', 'Currently Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'];

    useEffect(() => {
        if (selectedGameSlug) {
            fetch(`/api/games/details?slug=${selectedGameSlug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.details) {
                    setGameDetails(data.details)
                }
            })

        }
    }, [selectedGameSlug])

    return (
        <div>
            <Image className='block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>

            <main className="fixed w-full">
                {gameDetails && (
                    <div className='pb-20 overflow-scroll'>
                        <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                    </div>
                )}
                    <div className='w-auto max-w-[600px] h-full mx-auto bg-white text-black z-[2] rounded'>
                        <div className="bg-blue-700 w-full h-[120px] p-4 flex items-center justify-center rounded-tl rounded-tr">
                            <p className="text-white text-4xl font-semibold">{selectedList}</p>
                        </div>

                        <div className='block sm:hidden'>
                            <select
                                value={selectedList}
                                className='bg-white w-full h-full border-2 rounded focus:border-blue-500 p-2'
                                onChange={(e) => {
                                    setSelectedList(e.currentTarget.value)
                                }}
                            >
                                {lists.map((list: any, i: number) => (
                                    <option key={`${list}-option-${i}`} value={list}>{list}</option>
                                ))}
                            </select>
                        </div>
                        <div className='hidden sm:block'>
                            <div className="flex justify-evenly items-center w-auto relative bg-white border-b-2 border-black">
                                {lists.map((list, i) => {
                                    return <ListTypeButton key={`list-${list}-${i}`} listName={list} setSelectedList={setSelectedList}/>
                                })}
                            </div>
                        </div>
                        
                        {selectedList === 'Search' ? (
                            <Search setSlug={setSelectedGameSlug}/>
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
