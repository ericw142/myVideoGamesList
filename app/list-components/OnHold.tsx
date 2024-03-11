import React from 'react'
import { useCookies } from 'next-client-cookies';
import List from './List';

const OnHold = () => {
    const cookies = useCookies()
    const onHoldList = cookies.get('onHold')

    return (
        <div>
            {onHoldList ? (
                <List list={onHoldList}/>
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