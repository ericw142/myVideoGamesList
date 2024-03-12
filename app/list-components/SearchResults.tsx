/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import HamburgerButton from './HamburgerButton';
import getMetascoreBG from '../utils/getMetascoreBG';
import getMetascoreTagline from '../utils/getMetascoreTagline';
import addGameToList from '../utils/addGametoList';
import { useCookies } from 'next-client-cookies'

export interface Props {
    list: Array<any>;
}

const SearchResults = (props: Props) => {
    const cookies = useCookies()
    const [viewOptions, setViewOptions] = useState<Array<number>>([])
    const [selectedList, setSelectedList] = useState<string>('currentlyPlaying')
    const [messageDisplay, setMessageDisplay] = useState<string>('')

    useEffect(() => {
        setViewOptions([])
    }, [props.list])

    const showOptions = (key: number) => {
        const temp = [...viewOptions];
        const index = temp.indexOf(key);
        if (index !== -1) {
            temp.splice(index, 1);
        } else {
            temp.push(key)
        }
        setViewOptions(temp)
    }

    return (
        <div className='h-[580px] overflow-scroll'>
            {props.list.map((el: any, i: number) => {
                return (
                    <div key={`${i}-list-item-${el.id}`} className="grid grid-cols-6 gap-2 border-2 border-black m-2 rounded">
                        <div className='col-span-2'>
                            <img className='h-[100px] w-full' src={el.background_image} alt={el.name} width="auto" height="100px"/>
                        </div>
                        <div className="col-span-3">
                            <p className="font-semibold whitespace-nowrap">{viewOptions.includes(i) && 'Add '}{el.name}{viewOptions.includes(i) && ' to a list?'}</p>
                            {viewOptions.includes(i) ? (
                                <div>
                                    {messageDisplay ? (
                                        <p className='text-[#5fd12e] text-lg font-semibold'>{messageDisplay}</p>
                                    ) : (
                                        <>
                                            <select onChange={(e) => setSelectedList(e.currentTarget.value)} className='bg-white rounded w-full h-full p-1 mb-1 border-2 border-black'>
                                                <option value="currentlyPlaying">Currently Playing</option>
                                                <option value="completed">Completed</option>
                                                <option value="onHold">On Hold</option>
                                                <option value="dropped">Dropped</option>
                                                <option value="planToPlay">Plan to Play</option>
                                            </select>
                                            <button
                                                onClick={() => {
                                                    const updatedList = addGameToList(cookies.get(selectedList), { id: el.id, name: el.name, background_image: el.background_image, rating: "0" })
                                                    cookies.set(selectedList, updatedList)
                                                    setMessageDisplay('Added to list')
                                                    setInterval(() => {
                                                        setMessageDisplay('')
                                                    }, 4000)
                                                }}
                                                className="border-solid border-2 border-[rgb(127,187,103)] text-[rgb(127,187,103)] px-2 rounded cursor-pointer hover:bg-[rgb(127,187,103)] hover:text-white"
                                            >
                                                Add
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                    <div className='col-span-2'>
                                        <p>Metacritic Score </p>
                                        <p>{getMetascoreTagline(el.metacritic)}</p>
                                    </div>
                                    <div className='col-span-1 py-2 text-center'>
                                        <div className={`${getMetascoreBG(el.metacritic)} w-auto inline-block p-2 rounded font-bold`}>{el.metacritic ?? '0'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='col-span-1'>
                            <div className='mt-[23px]'>
                                <HamburgerButton default={viewOptions.includes(i)} clickHandler={() => showOptions(i)}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults