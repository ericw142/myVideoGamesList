import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';
import removeGameFromList from '../utils/removeGameFromList';
import updateGameInList from '../utils/updateGameInList';

const CurrentlyPlaying = () => {
    const cookies = useCookies()
    const currentlyPlayingList = cookies.get('currentlyPlaying')

    const updateRating = (gameIndex: number, updatedGame: any) => {
        const updated = updateGameInList(currentlyPlayingList, gameIndex, updatedGame);
        cookies.set('currentlyPlaying', updated);
    }

    const deleteHandler = (gameIndex: number) => {
        const updated = removeGameFromList(currentlyPlayingList, gameIndex);
        cookies.set('currentlyPlaying', updated);
    }

    return (
        <div>
            {currentlyPlayingList ? (
                <List list={currentlyPlayingList} updateRatingHandler={updateRating} deleteHandler={deleteHandler}/>
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

export default CurrentlyPlaying