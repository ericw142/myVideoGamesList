"use client"
import { useState, useEffect } from 'react'
import GamesDisplay from './components/GamesDisplay'
import GenreButton from './components/GenreButton'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

export default function Discover() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setGames({ results: [] })
        fetch(`/api/games?genre=${selectedGenre}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data?.games) {
                setGames(data.games)
            }
            setLoading(false)
          })
    }, [selectedGenre])

    if (isLoading) return <div></div>;

    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h5>Select a genre</h5>
                <div className='row'>
                    <GenreButton genre='action' setSelectedGenre={setSelectedGenre}/>
                    <GenreButton genre='indie' setSelectedGenre={setSelectedGenre}/>
                </div>
                <div className='text-center'>
                    <GamesDisplay title={capitalizeFirstLetter(selectedGenre)} games={games?.results ?? []}/>
                </div>
            </main>
        </div>
    );
}
