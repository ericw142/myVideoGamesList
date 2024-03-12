/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    item: any;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const ComingSoonTile = (props: Props) => {
    if (!props.item?.background_image) return <></>;

    const getReleaseDate = (released: any) => {
        if (!released) return 'To be announced';
        return released;
    }

    return (
        <div className='bg-white rounded' onClick={() => props.setSelectedGameSlug(props.item?.slug)}>
                <img className='block w-full h-[277.5px]' src={props.item?.background_image} alt={props.item?.name} />
            <div className='text-start p-1 pl-3'>
                <p className='font-bold'>{props.item?.name}</p>
                <hr />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                    <div className='col-span-2'>
                        <p>Release Date </p>
                        <p>{getReleaseDate(props.item?.released)}</p>
                    </div>
                    <div className='col-span-1 py-2 text-center'>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoonTile