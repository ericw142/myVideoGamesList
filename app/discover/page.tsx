"use client"
import { useState, useEffect } from 'react'
import GamesDisplay from './components/GamesDisplay'
import GenreButton from './components/GenreButton'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import Image from 'next/image'
import DetailedView from './components/DetailedView'
import Pagination from './components/Pagination'

export default function Discover() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [genres, setGenres] = useState<[{}]>([{}])
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

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
        setPage(1)
    }, [selectedGenre])

    useEffect(() => {
        setGames({ results: [] })
        fetch(`/api/games?genre=${selectedGenre}&page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games && data?.games?.count !== undefined && data?.games?.results !== undefined) {
                setGames(data.games)
                setTotalPages(Math.ceil((data.games.count / data.games.results.length)))
            }
            setLoading(false)
          })
    }, [selectedGenre, page])

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
                    <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                ) : (
                    <div className='text-center w-full h-[850px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <h5>Select a genre</h5>
                        <div className=''>
                            {genres.map((el: any, i: number) => (
                                <GenreButton key={`genreButton-${i}`} name={el.name} slug={el.slug} setSelectedGenre={setSelectedGenre}/>
                            ))}
                        </div>
                        <div className='text-center'>
                            <GamesDisplay title={capitalizeFirstLetter(selectedGenre)} games={games?.results ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                        </div>
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
}
