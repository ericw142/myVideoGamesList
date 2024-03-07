import React, { Dispatch, SetStateAction } from 'react'
import GameTile from './GameTile'

export interface Props {
    title: string;
    games: Array<any>;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const GamesDisplay = (props: Props) => {
    return (
        <div>
            <h2 className='text-black font-bold md:text-xl p-4'>{props.title}</h2>

            <div>
                {props.games?.map((item, id) => (
                   <GameTile key={`${item.name}-${id}-tile`} item={item} setSelectedGameSlug={props.setSelectedGameSlug}/>
                ))}
            </div>
        </div>
    )
}

export default GamesDisplay