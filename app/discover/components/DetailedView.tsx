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
    }, [])

    return (
        <div className='w-full h-[800px] mx-auto bg-white/90 z-50 overflow-scroll overscroll-contain rounded'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                    <img src={props.details.background_image} alt={props.details.name} width="auto" height="auto"/>
                    <img src={props.details.background_image_additional} alt={props.details.name} width="auto" height="auto"/>
                </div>

                <div className='pt-4'>
                    <h5 className='font-bold text-3xl'>{props.details.name}</h5>
                    <p>{props.details.description_raw}</p>
                    <button className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white' onClick={() => props.setGameDetails(undefined)}>Back</button>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div>
                            <p className='font-bold text-xl'>Platforms: </p>
                            <ul>
                                {props.details.platforms.map((el: any, i: number) => (
                                    <li key={`platform-li-${i}`}>{el.platform.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            {achievements?.results && (
                                <div>
                                    <p className='font-bold text-xl'>Achievements</p>
                                    <p>Count: {achievements.count}</p>
                                    <div className='h-[600px] overflow-scroll'>
                                        <ul>
                                            {achievements.results.map((el: any, i: number) => (
                                                <li key={`achievement-li-${i}`}>
                                                    <img width="100px" height="auto" src={el.image} alt={el.name}/>
                                                    {el.name} : {el.description}
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