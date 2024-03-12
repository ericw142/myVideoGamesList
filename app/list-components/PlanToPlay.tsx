import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';
import removeGameFromList from '../utils/removeGameFromList';
import updateGameInList from '../utils/updateGameInList';

const PlanToPlay = () => {
    const cookies = useCookies()
    const planToPlayList = cookies.get('planToPlay')

    const updateRating = (gameIndex: number, updatedGame: any) => {
        const updated = updateGameInList(planToPlayList, gameIndex, updatedGame);
        cookies.set('planToPlay', updated);
    }

    const deleteHandler = (gameIndex: number) => {
        const updated = removeGameFromList(planToPlayList, gameIndex);
        cookies.set('planToPlay', updated);
    }

    return (
        <div>
            {planToPlayList ? (
                <List list={planToPlayList} updateRatingHandler={updateRating} deleteHandler={deleteHandler}/>
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

export default PlanToPlay