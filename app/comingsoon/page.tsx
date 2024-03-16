"use client"
import { useState, useEffect } from 'react'
import DetailedView from '../discover/components/DetailedView'
import Pagination from '../discover/components/Pagination'
import blockedTags from '../utils/blockedTags'
import blockedNames from '../utils/blockedNames'
import ComingSoonDisplay from './components/ComingSoonDisplay'
import LoadingAnimation from '../discover/components/LoadingAnimation'

export default function ComingSoon() {
    const [games, setGames] = useState<[]>([])
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>('')
    const [gameDetails, setGameDetails] = useState<any>(undefined)
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setGames([])
        fetch(`/api/games/comingsoon?page=${page}`)
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

    return (
        <main>
             {gameDetails ? (
                 <DetailedView details={gameDetails} setGameDetails={setGameDetails} slug={selectedGameSlug} setSlug={setSelectedGameSlug}/>
             ) : (
                <div className='container text-center mx-auto px-10 py-20'>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                            <div className='text-start flex items-center'>
                                <h2 className='text-black font-bold md:text-[30px] p-4'>Coming Soon</h2>
                            </div>
                            <div></div>
                        </div>
                    {isLoading ? (
                        <div className='flex flex-row min-h-screen justify-center items-center'>
                            <LoadingAnimation />
                        </div>
                    ) : (
                        <>
                            <ComingSoonDisplay games={games ?? []} setSelectedGameSlug={setSelectedGameSlug}/>
                            <Pagination page={page} totalPages={10} setPage={setPage} />
                        </>
                    )}
                </div>  
             )}
        </main>
    )
}