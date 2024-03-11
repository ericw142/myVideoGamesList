import React from 'react'
import { useCookies } from 'next-client-cookies';

const OnHold = () => {
    const cookies = useCookies()
    const onHoldList = cookies.get('onHold')

    return (
        <div>
            {onHoldList ? (
                <div>
                    {JSON.parse(onHoldList).map((el: { id: string, name: string, background_image: string }, i: number) => {
                        return (
                            <div key={`${i}-list-item-${el.id}`}>{el.name}</div>
                        )
                    })}
                </div>
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