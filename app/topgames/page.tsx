"use client"
import { useState, useEffect } from 'react'
import TopGamesDisplay from './components/TopGamesDisplay'

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

    if (isLoading) return <div></div>;

    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className='text-center'>
                    <TopGamesDisplay title={'Top Games by Metacritic Rating'} games={games?.results ?? []}/>
                </div>
            </main>
        </div>
    );
}
