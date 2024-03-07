"use client"
import { useState, useEffect } from 'react'
import TopGamesDisplay from './components/TopGamesDisplay'
import Image from 'next/image'

export default function TopGames() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setGames({ results: [] })
        fetch(`/api/games/topgames`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games) {
                setGames(data.games)
            }
            setLoading(false)
          })
    }, [])

    return (
        <div className=''>
           <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
            <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">
                {!isLoading && (
                    <div className='text-center w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <TopGamesDisplay title={'Top Games by Metacritic Rating'} games={games?.results ?? []}/>
                    </div>  
                )}
            </main>
        </div>
    );
}
