/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    item: any;
    setSelectedGameSlug: Dispatch<SetStateAction<string>>;
}

const TopGamesTile = (props: Props) => {
    if (!props.item?.background_image) return <></>;

    const getMetascoreBG = (score: number) => {
        if (score >= 60) return 'bg-[rgb(93,203,130)]';
        if (score >= 40) return 'bg-[rgb(245,192,89)]';
        return 'bg-[rgb(237,114,119)]';
    }

    const getMetascoreTagline = (score: number) => {
        if (score >= 80) return 'Universal Acclaim';
        if (score >= 60) return 'Generally favorable';
        if (score >= 40) return 'Mixed or Average';
        if (score >= 20) return 'Generally unfavorable';
        return 'Overwhelming Disapproval'
    }

    return (
        <div className='bg-white rounded' onClick={() => props.setSelectedGameSlug(props.item?.slug)}>
                <img className='block w-full h-[277.5px]' src={props.item?.background_image} alt={props.item?.name} />
            <div className='text-start p-1 pl-3'>
                <p className='font-bold'>{props.item?.name}</p>
                <hr />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                    <div className='col-span-2'>
                        <p>Metacritic Score </p>
                        <p>{getMetascoreTagline(props.item?.metacritic)}</p>
                    </div>
                    <div className='col-span-1 py-2 text-center'>
                        <div className={`${getMetascoreBG(props.item?.metacritic)} w-auto inline-block p-2 rounded font-bold`}>{props.item?.metacritic ?? '0'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopGamesTile