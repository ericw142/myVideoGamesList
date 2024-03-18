/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import HamburgerButton from './HamburgerButton';
import Star from './Star';

export interface Props {
    list: string;
    updateRatingHandler: Function;
    deleteHandler: Function;
}

const List = (props: Props) => {
    const [viewOptions, setViewOptions] = useState<Array<number>>([])

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
        <div className='h-[65vh] overflow-scroll'>
            {JSON.parse(props.list).map((el: { id: string | undefined, name: string | undefined, background_image: string | undefined, rating: string }, i: number) => {
                return (
                    <div key={`${i}-list-item-${el.id}`} className="grid grid-cols-6 gap-2 border-2 border-black m-2 rounded">
                        <div className='col-span-2'>
                            <img className='h-[100px] w-full' src={el.background_image} alt={el.name} width="auto" height="100px"/>
                        </div>
                        <div className="col-span-3">
                            <p className="font-semibold whitespace-nowrap">{viewOptions.includes(i) && 'Update rating for '}{el.name}</p>
                            {viewOptions.includes(i) ? (
                                <div>
                                    <select
                                        defaultValue={el.rating}
                                        onChange={(e) => {
                                            showOptions(i)
                                            props.updateRatingHandler(i, { ...el, rating: e.currentTarget.value })
                                        }}
                                        className='bg-white rounded w-full h-full p-1 border-2 border-black mb-2'
                                    >
                                        <option value="0">No stars</option>
                                        <option value="1">1 out of 5</option>
                                        <option value="2">2 out of 5</option>
                                        <option value="3">3 out of 5</option>
                                        <option value="4">4 out of 5</option>
                                        <option value="5">5 out of 5</option>
                                    </select>
                                    <button
                                        onClick={() => {
                                            props.deleteHandler(i)
                                        }}
                                        className='border-solid border-2 border-[rgb(255,0,0)] text-[rgb(255,0,0)] px-2 rounded cursor-pointer hover:bg-[rgb(255,0,0)] hover:text-white'
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>Rating:</p>
                                    <div className='flex flex-row'>{el.rating !== undefined ? Array(parseInt(el.rating)).fill(<Star />) : ''}</div>
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

export default List