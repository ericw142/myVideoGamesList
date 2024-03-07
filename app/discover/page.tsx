"use client"
import { useState, useEffect } from 'react'
import GamesDisplay from './components/GamesDisplay'
import GenreButton from './components/GenreButton'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import Image from 'next/image'

export default function Discover() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [genres, setGenres] = useState<[{}]>([{}])
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [selectedGame, setSelectedGame] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/genres')
            .then((res) => res.json())
            .then((data) => {
                if (data?.genres) {
                    setGenres(data.genres.results)
                }
            })
    }, [])

    useEffect(() => {
        setGames({ results: [] })
        fetch(`/api/games?genre=${selectedGenre}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games) {
                setGames(data.games)
            }
            setLoading(false)
          })
    }, [selectedGenre])

    useEffect(() => {
        if (selectedGame) {
            fetch(`/api/games/details?slug=${selectedGame}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.details) {
                    setGameDetails(data.details)
                }
            })

        }
    }, [selectedGame])

    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
            <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">
                {isLoading ? (
                    <></>
                ) : gameDetails ? (
                    <div className='text-center w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <button className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white' onClick={() => setGameDetails(undefined)}>Back</button>
                        <h5>{gameDetails.name}</h5>
                        <p>{gameDetails.description_raw}</p>
                        <p>Platforms: </p>
                        <ul>
                            {gameDetails.platforms.map((el: any, i: number) => (
                                <li key={`platform-li-${i}`}>{el.platform.name}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className='text-center w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <h5>Select a genre</h5>
                        <div className='row'>
                            {genres.map((el: any, i: number) => (
                                <GenreButton key={`genreButton-${i}`} name={el.name} slug={el.slug} setSelectedGenre={setSelectedGenre}/>
                            ))}
                        </div>
                        <div className='text-center'>
                            <GamesDisplay title={capitalizeFirstLetter(selectedGenre)} games={games?.results ?? []} setSelectedGame={setSelectedGame}/>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
