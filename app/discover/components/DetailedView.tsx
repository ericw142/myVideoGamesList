/* eslint-disable @next/next/no-img-element */
import truncateString from '@/app/utils/truncateString';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useCookies } from 'next-client-cookies'
import addGameToList from '@/app/utils/addGametoList';

export interface Props {
    details: {
        id?: number;
        slug?: string;
        name?: string;
        name_original?: string;
        description?: string;
        metacritic?: number;
        metacritic_platforms?: [
            {
                metascore: number;
                url: string;
            }
        ];
        released?: string; //YYYY-MM-DD
        tba?: boolean;
        updated?: string; //2024-03-07T15:07:57Z
        background_image?: string;
        background_image_additional?: string;
        website?: string;
        rating?: number;
        rating_top?: number;
        ratings?: {};
        reactions?: {};
        added?: number;
        added_by_status?: {};
        playtime?: number;
        screenshots_count?: number;
        movies_count?: number;
        creators_count?: number;
        achievements_count?: number;
        parent_achievements_count?: string;
        reddit_url?: string;
        reddit_name?: string;
        reddit_description?: string;
        reddit_logo?: string;
        reddit_count?: number;
        twitch_count?: string;
        youtube_count?: string;
        reviews_text_count: string;
        ratings_count?: number;
        suggestions_count?: number;
        alternative_names?: string;
        metacritic_url?: string;
        parents_count?: number;
        additions_count?: number;
        game_series_count?: number;
        esrb_rating?: {
            id: number;
            slug: string;
            name: string;
        };
        description_raw?: string;
        platforms?: [
            {
                platform: {
                    id: number;
                    slug: string;
                    name: string;
                },
                released_at: string;
                requirements: {
                    minimum: string;
                    recommended: string;
                }
            }
        ];
    };
    setGameDetails: Dispatch<SetStateAction<any>>
    slug: string;
    setSlug: Dispatch<SetStateAction<string>>
}

const DetailedView = (props: Props) => {
    const cookies = useCookies()
    const [achievements, setAchievements] = useState<any>()
    const [selectedList, setSelectedList] = useState<string>('currentlyPlaying')
    const [messageDisplay, setMessageDisplay] = useState<string>('')

    useEffect(() => {
        if (props.slug) {
            fetch(`/api/games/details/achievements?slug=${props.slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.achievements) {
                    setAchievements(data.achievements)
                }
            })
    
        }
    }, [props.slug])

    useEffect(() => {
        if (messageDisplay) {
            setInterval(() => setMessageDisplay(''), 4000)
        }
    }, [messageDisplay])

    const formatReleaseDate = (released: string | undefined) => {
        if (!released) return '';
        return `Released: ${released.slice(5,7)}/${released.slice(8,10)}/${released.slice(0,4)}`;
    }

    return (
        <div className='w-full h-full mx-auto bg-white z-50'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                <div>
                    <img className='max-h-[424px] w-full' src={props.details.background_image} alt={props.details.name} width="auto" height="424px"/>
                    <img className='max-h-[424px] w-full' src={props.details.background_image_additional} alt={props.details.name} width="auto" height="424px"/>
                </div>

                <div className='h-full pt-4 pr-4 overflow-scroll px-2'>
                    <div className='flex justify-between'>
                        <h5 className='font-bold text-3xl'>{props.details.name}</h5>
                        <button
                            onClick={() => {
                                props.setSlug('')
                                props.setGameDetails(undefined)
                            }}
                            className='border-solid border-2 border-black px-6 rounded cursor-pointer hover:bg-black hover:text-white'
                        >
                            Back
                        </button>
                    </div>
                    <p>{truncateString(props.details.description_raw, 1000)}</p>
                    
                    
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3'>
                        <div>
                            <div>
                                <h6 className='font-bold text-xl'>Select a list to add this game to</h6>
                                <select onChange={(e) => setSelectedList(e.currentTarget.value)} className='bg-white rounded w-full h-full p-2 border-2 border-black'>
                                    <option value="currentlyPlaying">Currently Playing</option>
                                    <option value="completed">Completed</option>
                                    <option value="onHold">On Hold</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="planToPlay">Plan to Play</option>
                                </select>
                                <button
                                    onClick={() => {
                                        const updatedList = addGameToList(cookies.get(selectedList), { id: props.details.id, name: props.details.name, background_image: props.details.background_image, rating: "0" })
                                        cookies.set(selectedList, updatedList)
                                        setMessageDisplay('Added to list')
                                    }}
                                    className='mt-3 border-solid border-2 border-black px-6 rounded cursor-pointer hover:bg-black hover:text-white'
                                >
                                    Add to List
                                </button>
                                <p className='text-[#5fd12e] text-lg font-semibold'>{messageDisplay}</p>
                            </div>
                            <div className='pt-2 pb-6'>
                                <p>{formatReleaseDate(props.details.released)}</p>
                                <a className='text-blue-700' href={props.details.website} target='_blank'>{props.details.name} Website</a>
                                <br />
                                <p>Metacritic Score: {props.details.metacritic} - <a className='text-blue-700' href={props.details.metacritic_url} target='_blank'>Reviews</a></p>
                                <p>{props.details.esrb_rating?.name ? `ESRB: ${props.details.esrb_rating.name}` : ''}</p>
                            </div>
                            <div>
                                <h6 className='font-bold text-xl'>Platforms </h6>
                                <ul>
                                    {props.details.platforms?.map((el: any, i: number) => (
                                        <li key={`platform-li-${i}`}>{el.platform.name}</li>
                                    ))}
                                </ul>
                            </div>
                            
                        </div>
                        <div>
                            {achievements?.results?.length > 0 && (
                                <div>
                                    <h6 className='font-bold text-xl'>Achievements</h6>
                                    <div className='h-[600px] overflow-scroll'>
                                        <ul>
                                            {achievements.results.map((el: any, i: number) => (
                                                <li key={`achievement-li-${i}`}>
                                                    <div className='grid grid-cols-3 gap-2'>
                                                        <div className='col-span-1'>
                                                            <img width="100px" height="auto" src={el.image} alt={el.name}/>
                                                        </div>
                                                        <div className='col-span-2 text-left'>
                                                            <p>{el.name} : {el.description}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedView