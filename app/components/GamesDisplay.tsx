import React from 'react'
import GameTile from './GameTile'

const GamesDisplay = ({ title, games }) => {
    return (
        <div>
            <h2 className='text-black font-bold md:text-xl p-4'>{title}</h2>

            <div>
                {games.map((item, id) => (
                   <GameTile key={`${item.name}-${id}-tile`} item={item}/>
                ))}
            </div>
        </div>
    )
}

export default GamesDisplay