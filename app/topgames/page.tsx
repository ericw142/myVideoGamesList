"use client"
import { useState, useEffect } from 'react'
import TopGamesDisplay from './components/TopGamesDisplay'
import Image from 'next/image'
import DetailedView from '../discover/components/DetailedView'
import Pagination from '../discover/components/Pagination'
import blockedTags from '../utils/blockedTags'
import LoadingAnimation from '../discover/components/LoadingAnimation'

export default function TopGames() {
    const [games, setGames] = useState<[]>([])
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setGames([])
        setLoading(true)
        fetch(`/api/games/topgames?page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.results !== undefined) {
                const filtered =  data.results.filter((result: any) =>
                    !result.tags.some((tag: any) => blockedTags.includes(tag.slug))
                );
                setGames(filtered)
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
                {gameDetails ? (
                    <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                ) : (
                    <div className='text-center w-full h-[850px] mx-auto bg-white z-50 overflow-scroll overscroll-contain rounded'>
                        <h2 className='text-black font-bold md:text-xl p-4'>Top Games by Metacritic Rating</h2>
                        {isLoading ? (
                            <div className='flex flex-row min-h-screen justify-center items-center'>
                                <LoadingAnimation />
                            </div>
                        ) : (
                            <>
                                <TopGamesDisplay games={games ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                                <Pagination page={page} totalPages={1000} setPage={setPage} />
                            </>
                        )}
                        
                    </div>  
                )}
            </main>
        </div>
    );
}
