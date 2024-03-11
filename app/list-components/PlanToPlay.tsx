import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';

const PlanToPlay = () => {
    const cookies = useCookies()
    const planToPlayList = cookies.get('onHold')

    return (
        <div>
            {planToPlayList ? (
                <List list={planToPlayList}/>
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