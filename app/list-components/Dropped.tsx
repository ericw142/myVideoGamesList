import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';
import removeGameFromList from '../utils/removeGameFromList';
import updateGameInList from '../utils/updateGameInList';

const Dropped = () => {
    const cookies = useCookies()
    const droppedList = cookies.get('dropped')

    const updateRating = (gameIndex: number, updatedGame: any) => {
        const updated = updateGameInList(droppedList, gameIndex, updatedGame);
        cookies.set('dropped', updated);
    }

    const deleteHandler = (gameIndex: number) => {
        const updated = removeGameFromList(droppedList, gameIndex);
        cookies.set('dropped', updated);
    }

    return (
        <div>
            {droppedList ? (
                <List list={droppedList} updateRatingHandler={updateRating} deleteHandler={deleteHandler}/>
            ) : (
                <div>
                    <hr />
                    <p className='p-3 py-[100px]'>Nothing saved yet. Add some games using the Search, Discover, or elsewhere on the site!</p>
                    <hr />
                </div>
            )}
        </div>
    )
}

export default Dropped