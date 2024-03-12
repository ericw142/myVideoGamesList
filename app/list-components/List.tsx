/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import HamburgerButton from './HamburgerButton';

export interface Props {
    list: string;
}

const List = (props: Props) => {
    const [viewOptions, setViewOptions] = useState<Array<number>>([])

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
        <div>
            {JSON.parse(props.list).map((el: { id: string | undefined, name: string | undefined, background_image: string | undefined }, i: number) => {
                return (
                    <div key={`${i}-list-item-${el.id}`} className="grid grid-cols-6 gap-2 border-2 border-black m-2 rounded">
                        <div className='col-span-2'>
                            <img className='h-[100px] w-full' src={el.background_image} alt={el.name} width="auto" height="100px"/>
                        </div>
                        <div className="flex items-center col-span-3">
                            <p className="font-semibold">{el.name}</p>
                            {viewOptions.includes(i) && (
                                <div className='ml-auto'>
                                    <button
                                        className='border-solid border-2 border-[rgb(255,0,0)] text-[rgb(255,0,0)] px-2 rounded cursor-pointer hover:bg-[rgb(255,0,0)] hover:text-white'
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='col-span-1'>
                            <div className='mt-[23px]'>
                                <HamburgerButton clickHandler={() => showOptions(i)}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List