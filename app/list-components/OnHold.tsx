import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';
import removeGameFromList from '../utils/removeGameFromList';
import updateGameInList from '../utils/updateGameInList';

const OnHold = () => {
    const cookies = useCookies()
    const onHoldList = cookies.get('onHold')

    const updateRating = (gameIndex: number, updatedGame: any) => {
        const updated = updateGameInList(onHoldList, gameIndex, updatedGame);
        cookies.set('onHold', updated);
    }

    const deleteHandler = (gameIndex: number) => {
        const updated = removeGameFromList(onHoldList, gameIndex);
        cookies.set('onHold', updated);
    }

    return (
        <div>
            {onHoldList ? (
                <List list={onHoldList} updateRatingHandler={updateRating} deleteHandler={deleteHandler}/>
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

export default OnHold