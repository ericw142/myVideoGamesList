/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'

export interface Props {
    details: {
        id: number;
        slug: string;
        name: string;
        name_original: string;
        description: string;
        metacritic: number;
        metacritic_platforms: [
            {
                metascore: number;
                url: string;
            }
        ];
        released: string; //YYYY-MM-DD
        tba: boolean;
        updated: string; //2024-03-07T15:07:57Z
        background_image: string;
        background_image_additional: string;
        website: string;
        rating: number;
        rating_top: number;
        ratings: {};
        reactions: {};
        added: number;
        added_by_status: {};
        playtime: number;
        screenshots_count: number;
        movies_count: number;
        creators_count: number;
        achievements_count: number;
        parent_achievements_count: string;
        reddit_url: string;
        reddit_name: string;
        reddit_description: string;
        reddit_logo: string;
        reddit_count: number;
        twitch_count: string;
        youtube_count: string;
        reviews_text_count: string;
        ratings_count: number;
        suggestions_count: number;
        alternative_names: string;
        metacritic_url: string;
        parents_count: number;
        additions_count: number;
        game_series_count: number;
        esrb_rating: {
            id: number;
            slug: string;
            name: string;
        };
        description_raw: string;
        platforms: [
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
}

const DetailedView = (props: Props) => {
    const [achievements, setAchievements] = useState<any>()

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

    const formatReleaseDate = (released: string) => {
        if (!released) return '';
        return `${released.slice(5,7)}/${released.slice(8,10)}/${released.slice(0,4)}`;
    }

    return (
        <div className='w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                    <img src={props.details.background_image} alt={props.details.name} width="auto" height="auto"/>
                    <img src={props.details.background_image_additional} alt={props.details.name} width="auto" height="auto"/>
                </div>

                <div className='pt-4 pr-4'>
                    <div className='flex justify-between'>
                        <h5 className='font-bold text-3xl'>{props.details.name}</h5>
                        <button
                            onClick={() => props.setGameDetails(undefined)}
                            className='border-solid border-2 border-gray-500 px-6 rounded cursor-pointer text-gray-500 hover:bg-gray-500 hover:text-white'
                        >
                            Back
                        </button>
                    </div>
                    <p>{props.details.description_raw}</p>
                    
                    
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div>
                            <div className='pt-2 pb-6'>
                                <p>Released: {formatReleaseDate(props.details.released)}</p>
                                <a className='text-blue-700' href={props.details.website} target='_blank'>{props.details.name} Website</a>
                                <br />
                                <p>Metacritic Score: {props.details.metacritic} - <a className='text-blue-700' href={props.details.metacritic_url} target='_blank'>Reviews</a></p>
                                <p>ESRB: {props.details.esrb_rating.name}</p>
                            </div>
                            <div>
                                <p className='font-bold text-xl'>Platforms: </p>
                                <ul>
                                    {props.details.platforms.map((el: any, i: number) => (
                                        <li key={`platform-li-${i}`}>{el.platform.name}</li>
                                    ))}
                                </ul>
                            </div>
                            
                        </div>
                        <div>
                            {achievements?.results && (
                                <div>
                                    <p className='font-bold text-xl'>Achievements</p>
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