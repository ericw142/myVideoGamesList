"use client"
import { useState, useEffect, Key } from 'react'
import GameTile from './components/GameTile'

export default function Home() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch('/api')
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data?.data) {
    //             setData(data.data)
    //         }
    //         setLoading(false)
    //       })
    // }, [])

    if (isLoading) return <div></div>;

    return (
        <div>
            <div className="flex items-center justify-end p-4 z-[100] w-full absolute">
                <button className="p-2">Login</button>
                <button className="p-2">Signup</button>
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                My Video Games List

                <div>
                    {data?.results.map((el: any, i: Key | null | undefined) => (
                        <GameTile key={i} item={el}/>
                    ))}
                </div>
            </main>
        </div>
    );
}
