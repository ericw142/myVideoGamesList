import React from 'react'
import { useCookies } from 'next-client-cookies';

const CurrentlyPlaying = () => {
    const cookies = useCookies()
    const currentlyPlayingList = cookies.get('currentlyPlaying')

    return (
        <div>
            {!currentlyPlayingList && (
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