"use client"
import { useState, useEffect } from 'react'
import DetailedView from './components/DetailedView'
import Pagination from './components/Pagination'
import blockedTags from '../utils/blockedTags'
import blockedNames from '../utils/blockedNames'
import FilterRow from './components/FilterRow'
import LoadingAnimation from './components/LoadingAnimation'
import TopGamesDisplay from '../topgames/components/TopGamesDisplay'

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
        setLoading(true)
        fetch(`/api/games?genre=${selectedGenre}${selectedPlatform && `&platform=${selectedPlatform}`}&page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.results !== undefined) {
                const filteredByTag =  data.results.filter((result: any) =>
                    !result.tags.some((tag: any) => blockedTags.includes(tag.slug))
                );
                const filtered = filteredByTag.filter((result: any) => (
                    !blockedNames.some((name: string) => result.name.toLowerCase().includes(name))
                ))
                setGames(filtered)
                const total = Math.ceil(data.count / 20);
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
        <main>
                {gameDetails ? (
                    <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                ) : (
                    <div className='container text-center mx-auto px-10 py-20'>
                        <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                            <div className='text-start flex items-center'>
                                <h2 className='text-black font-bold md:text-[30px] p-4'>Discover games</h2>
                            </div>
                            <div>
                                <div className=''>
                                    <h2 className='text-start text-md font-bold'>Filters</h2>
                                    <FilterRow filterName={'Genre'} setFilter={setSelectedGenre} options={genres} disabled={isLoading}/>
                                    <FilterRow filterName={'Platform'} setFilter={setSelectedPlatform} options={platforms} disabled={isLoading}/>
                                </div>
                            </div>
                        </div>
                        {isLoading ? (
                            <div className='flex flex-row min-h-screen justify-center items-center'>
                                <LoadingAnimation />
                            </div>
                        ) : (
                            <>
                                <TopGamesDisplay games={games ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                                <Pagination page={page} totalPages={100} setPage={setPage} />
                            </>
                        )}
                    </div>
                )}
        </main>
    );
}
