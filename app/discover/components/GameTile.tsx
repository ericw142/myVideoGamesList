/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    item: any;
    setSelectedGame: Dispatch<SetStateAction<any>>;
}

const GameTile = (props: Props) => {
    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative' onClick={() => props.setSelectedGame(props.item?.slug)}>
            <img className='block w-full h-[157.5px]' src={props.item?.background_image} alt={props.item?.name} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{props.item?.name}</p>
            </div>
        </div>
    )
}

export default GameTile