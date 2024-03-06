import capitalizeFirstLetter from '@/app/utils/capitalizeFirstLetter'
import React from 'react'

const GenreButton = ({ genre, setSelectedGenre }) => {
    const title = capitalizeFirstLetter(genre)

    return <button onClick={() => setSelectedGenre(genre)} className='bg-blue-600 px-6 py-2 rounded cursor-pointer text-white'>{title}</button>
}

export default GenreButton