"use client"
import { useState, useEffect } from 'react'
import GamesDisplay from './components/GamesDisplay'
import GenreButton from './components/GenreButton'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import Image from 'next/image'
import DetailedView from './components/DetailedView'

export default function Discover() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [genres, setGenres] = useState<[{}]>([{}])
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
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
        if (selectedGameSlug) {
            fetch(`/api/games/details?slug=${selectedGameSlug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.details) {
                    setGameDetails(data.details)
                }
            })

        }
    }, [selectedGameSlug])

    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
            <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">
                {isLoading ? (
                    <></>
                ) : gameDetails ? (
                    <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug}/>
                ) : (
                    <div className='text-center w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <h5>Select a genre</h5>
                        <div className='row'>
                            {genres.map((el: any, i: number) => (
                                <GenreButton key={`genreButton-${i}`} name={el.name} slug={el.slug} setSelectedGenre={setSelectedGenre}/>
                            ))}
                        </div>
                        <div className='text-center'>
                            <GamesDisplay title={capitalizeFirstLetter(selectedGenre)} games={games?.results ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
