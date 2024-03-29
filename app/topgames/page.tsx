"use client"
import { useState, useEffect } from 'react'
import TopGamesDisplay from './components/TopGamesDisplay'
import DetailedView from '../discover/components/DetailedView'
import Pagination from '../discover/components/Pagination'
import blockedTags from '../utils/blockedTags'
import blockedNames from '../utils/blockedNames'
import LoadingAnimation from '../discover/components/LoadingAnimation'
import handleScrollToTop from '../utils/handleScrollToTop'

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
                const filteredByTag =  data.results.filter((result: any) =>
                    !result.tags.some((tag: any) => blockedTags.includes(tag.slug))
                );
                const filtered = filteredByTag.filter((result: any) => (
                    !blockedNames.some((name: string) => result.name.toLowerCase().includes(name))
                ))
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

    useEffect(() => {
        if (!isLoading) {
            handleScrollToTop()
        }
    }, [isLoading])

    return (
        <main>
            <div>
                {gameDetails ? (
                    <div className='pb-20'>
                        <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
                    </div>
                ) : (
                    <div className='container text-center mx-auto px-10 pb-20'>
                        <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                            <div className='text-start flex items-center'>
                                <h2 className='text-black font-bold md:text-[30px] p-4'>Top Games by Metacritic Rating</h2>
                            </div>
                            <div></div>
                        </div>
                        {isLoading ? (
                            <div className='flex flex-row min-h-screen justify-center items-center'>
                                <LoadingAnimation />
                            </div>
                        ) : (
                            <div>
                                <TopGamesDisplay games={games ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                                <Pagination page={page} totalPages={1000} setPage={setPage} />
                            </div>
                        )}                
                    </div>  
                )}
            </div>
        </main>
    );
}
