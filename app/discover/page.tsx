"use client"
import { useState, useEffect } from 'react'
import GamesDisplay from './components/GamesDisplay'
import Image from 'next/image'
import DetailedView from './components/DetailedView'
import Pagination from './components/Pagination'
import blockedTags from '../utils/blockedTags'
import FilterRow from './components/FilterRow'

export default function Discover() {
    const [games, setGames] = useState<[]>([])
    const [genres, setGenres] = useState<Array<any>>([{}])
    const [platforms, setPlatforms] = useState<Array<any>>([{}])
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(100)

    useEffect(() => {
        fetch('/api/genres')
            .then((res) => res.json())
            .then((data) => {
                if (data?.genres?.results) {
                    setGenres(data.genres.results)
                }
            })
        fetch('/api/platforms')
            .then((res) => res.json())
            .then((data) => {
                if (data?.platforms?.results) {
                    setPlatforms([{ id: '', slug: '', name: ''}, ...data.platforms.results])
                }
            })
    }, [])

    useEffect(() => {
        setPage(1)
    }, [selectedGenre, selectedPlatform])

    useEffect(() => {
        setGames([])
        fetch(`/api/games?genre=${selectedGenre}${selectedPlatform && `&platform=${selectedPlatform}`}&page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games?.results !== undefined) {
                const filtered =  data.games.results.filter((result: any) =>
                    !result.tags.some((tag: any) => blockedTags.includes(tag.slug))
                );
                setGames(filtered)
                const total = Math.ceil(data.games.count / 20);
                if (total > 100) {
                    setTotalPages(100)
                } else {
                    setTotalPages(total)
                }
            }
            setLoading(false)
          })
    }, [page, selectedGenre, selectedPlatform])

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
                        <div className='p-2 px-20'>
                            <h2 className='text-start text-md font-bold'>Filters</h2>
                            <FilterRow filterName={'Genre'} setFilter={setSelectedGenre} options={genres}/>
                            <FilterRow filterName={'Platform'} setFilter={setSelectedPlatform} options={platforms}/>
                        </div>
                        <div className='text-center'>
                            <GamesDisplay games={games ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                        </div>
                        <Pagination page={page} totalPages={100} setPage={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
}
