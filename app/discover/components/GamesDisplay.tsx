import React, { Dispatch, SetStateAction } from 'react'
import GameTile from './GameTile'

export interface Props {
    games: Array<any>;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const GamesDisplay = (props: Props) => {
    return (
        <div>
            <div>
                {props.games?.map((item, id) => (
                   <GameTile key={`${item.name}-${id}-tile`} item={item} setSelectedGameSlug={props.setSelectedGameSlug}/>
                ))}
            </div>
        </div>
    )
}

export default GamesDisplay