import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';

const Dropped = () => {
    const cookies = useCookies()
    const droppedList = cookies.get('dropped')

    return (
        <div>
            {droppedList ? (
                <List list={droppedList}/>
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