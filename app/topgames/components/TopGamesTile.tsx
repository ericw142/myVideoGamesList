/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    item: any;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const TopGamesTile = (props: Props) => {
    if (!props.item?.background_image) return <></>;

    return (
        <div className='bg-white rounded' onClick={() => props.setSelectedGameSlug(props.item?.slug)}>
                <img className='block w-full h-[277.5px]' src={props.item?.background_image} alt={props.item?.name} />
            <div className='text-start p-3'>
                <p>{props.item?.name} - {props.item?.released}</p>
                <p>Metacritic score: {props.item?.metacritic}</p>
            </div>
        </div>
    )
}

export default TopGamesTile