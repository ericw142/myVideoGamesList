"use client"
import { useState, useEffect } from 'react'
import TopGamesDisplay from './components/TopGamesDisplay'
import Image from 'next/image'
import DetailedView from '../discover/components/DetailedView'
import Pagination from '../discover/components/Pagination'

export default function TopGames() {
    const [games, setGames] = useState<{ results: [] }>({ results: [] })
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        setGames({ results: [] })
        fetch(`/api/games/topgames?page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.games) {
                setGames(data.games)
                setTotalPages(Math.ceil((data.games.count / 20)))
            }
            setLoading(false)
          })
    }, [page])

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
        <div className=''>
           <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
            <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">
                {isLoading ? (
                    <></>
                ) : gameDetails ? (
                    <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                ) : (
                    <div className='text-center w-full h-[850px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
                        <TopGamesDisplay title={'Top Games by Metacritic Rating'} games={games?.results ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </div>  
                )}
            </main>
        </div>
    );
}
