/* eslint-disable @next/next/no-img-element */
import React from 'react'
import HamburgerButton from './HamburgerButton';

export interface Props {
    list: string;
}

const List = (props: Props) => {
    return (
        <div>
            {JSON.parse(props.list).map((el: { id: string | undefined, name: string | undefined, background_image: string | undefined }, i: number) => {
                return (
                    <div key={`${i}-list-item-${el.id}`} className="grid grid-cols-3 gap-2 border-b-2 border-black">
                        <div>
                            <img className='h-[100px] w-full' src={el.background_image} alt={el.name} width="auto" height="100px"/>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold">{el.name}</p>
                        </div>
                        <div>
                            <div className='ml-[80px] mt-[18px]'>
                                <HamburgerButton />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List