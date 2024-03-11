import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';

const Completed = () => {
    const cookies = useCookies()
    const completedList = cookies.get('completed')

    return (
        <div>
            {completedList ? (
                <List list={completedList}/>
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

export default Completed