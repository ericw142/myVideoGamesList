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
        setGames({ results: [] })
        fetch(`/api/games?genre=${selectedGenre}&page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games) {
                setGames(data.games)
                setTotalPages(Math.ceil(data.games.count / 20))
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

    const goToPreviousPage = () => {
        if (page === 1) return;
        const prev = page - 1;
        setPage(prev);
    }

    const goToNextPage = () => {
        if (page === totalPages) return;
        const next = page + 1;
        setPage(next);
    }

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
                        <div className='p-4'>
                            <p className='font-bold'><button onClick={goToPreviousPage}><span>&#60;&#60;</span></button> {page} of {totalPages} <button onClick={goToNextPage}><span>&#62;&#62;</span></button></p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
