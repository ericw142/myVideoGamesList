import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    name: string;
    slug: string;
    setSelectedGenre: Dispatch<SetStateAction<string>>
}

const GenreButton = (props: Props) => {
    return (
        <button
            onClick={() => props.setSelectedGenre(props.slug)}
            className='px-6 rounded cursor-pointer text-black hover:bg-black hover:text-white'
        >
            {props.name}
        </button>
    )
}

export default GenreButton