import capitalizeFirstLetter from '@/app/utils/capitalizeFirstLetter'
import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    genre: string;
    setSelectedGenre: Dispatch<SetStateAction<string>>
}

const GenreButton = (props: Props) => {
    const title = capitalizeFirstLetter(props.genre)

    return <button onClick={() => props.setSelectedGenre(props.genre)} className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white'>{title}</button>
}

export default GenreButton