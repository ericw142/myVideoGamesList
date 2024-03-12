import React, { Dispatch, SetStateAction } from 'react'
import ComingSoonTile from './ComingSoonTile';

export interface Props {
    title: string;
    games: Array<any>;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const ComingSoonDisplay = (props: Props) => {
    return (
        <div className='p-3'>
            <h2 className='text-black font-bold md:text-xl p-4'>{props.title}</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {props.games?.map((item, id) => (
                   <ComingSoonTile key={`${item.name}-${id}-tile`} item={item} setSelectedGameSlug={props.setSelectedGameSlug}/>
                ))}
            </div>
        </div>
    )
}

export default ComingSoonDisplay