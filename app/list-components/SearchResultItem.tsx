/* eslint-disable @next/next/no-img-element */
import React, { useState, Dispatch, SetStateAction } from 'react'
import HamburgerButton from './HamburgerButton';
import getMetascoreBG from '../utils/getMetascoreBG';
import getMetascoreTagline from '../utils/getMetascoreTagline';
import addGameToList from '../utils/addGametoList';
import { useCookies } from 'next-client-cookies'

export interface Props {
    index: number;
    el: any;
    showOptions: Function;
    viewOptions: Array<number>;
    setSlug: Dispatch<SetStateAction<string>>;
}

const SearchResultItem = (props: Props) => {
    const cookies = useCookies()
    const [selectedList, setSelectedList] = useState<string>('currentlyPlaying')
    const [messageDisplay, setMessageDisplay] = useState<string>('')

    return (
        <div key={`${props.index}-list-item-${props.el.id}`} className="grid grid-cols-6 gap-2 border-2 border-black m-2 rounded">
            <div className='col-span-2'>
                <img onClick={() => props.setSlug(props.el.slug)} className='h-[100px] w-full' src={props.el.background_image} alt={props.el.name} width="auto" height="100px"/>
            </div>
            <div className="col-span-3">
                <p className="font-semibold">{props.viewOptions.includes(props.index) && 'Add '}{props.el.name}{props.viewOptions.includes(props.index) && ' to a list?'}</p>
                {props.viewOptions.includes(props.index) ? (
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
                                        const updatedList = addGameToList(cookies.get(selectedList), { id: props.el.id, name: props.el.name, background_image: props.el.background_image, rating: "0" })
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
                    <div className='grid grid-cols-3 gap-2'>
                        <div className='col-span-2'>
                            <p>Metacritic Score </p>
                            <p>{getMetascoreTagline(props.el.metacritic)}</p>
                        </div>
                        <div className='col-span-1 py-2 text-center'>
                            <div className={`${getMetascoreBG(props.el.metacritic)} w-auto inline-block p-2 rounded font-bold`}>{props.el.metacritic ?? '0'}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className='col-span-1'>
                <div className='mt-[23px]'>
                    <HamburgerButton default={props.viewOptions.includes(props.index)} clickHandler={() => props.showOptions(props.index)}/>
                </div>
            </div>
        </div>
    )
}

export default SearchResultItem