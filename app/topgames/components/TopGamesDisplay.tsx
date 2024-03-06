import React from 'react'
import TopGamesTile from './TopGamesTile';

export interface Props {
    title: string;
    games: Array<any>;
}

const TopGamesDisplay = (props: Props) => {
    return (
        <div className='p-3'>
            <h2 className='text-black font-bold md:text-xl p-4'>{props.title}</h2>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {props.games?.map((item, id) => (
                   <TopGamesTile key={`${item.name}-${id}-tile`} item={item}/>
                ))}
            </div>
        </div>
    )
}

export default TopGamesDisplay