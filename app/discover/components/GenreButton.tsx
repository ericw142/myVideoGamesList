import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    name: string;
    slug: string;
    setSelectedGenre: Dispatch<SetStateAction<string>>
}

const GenreButton = (props: Props) => {
    return <button onClick={() => props.setSelectedGenre(props.slug)} className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white'>{props.name}</button>
}

export default GenreButton