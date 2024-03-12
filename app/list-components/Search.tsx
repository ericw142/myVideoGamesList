import React, { useState } from 'react'
import SearchResults from './SearchResults'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setLoading] = useState(true)
    const [games, setGames] = useState<[]>([])

    const searchGames = () => {
        if (!searchTerm) return;

        fetch(`/api/games/search?search=${searchTerm}`)
        .then((res) => res.json())
          .then((data) => {
            if (data?.results !== undefined) {
                setGames(data.results)
            }
            setLoading(false)
          })
    }
    return (
        <div>
            <div className='w-full h-[60px] border-2 p-2 flex justify-between'>
                <input 
                    type="text" 
                    placeholder='Search all games'
                    className='w-[80%] h-[40px] border-2 rounded' 
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                ></input>
                <button
                    onClick={() => searchGames()}
                    className="w-[15%] h-[40px] border-solid border-2 border-[rgb(127,187,103)] text-[rgb(127,187,103)] px-2 rounded cursor-pointer hover:bg-[rgb(127,187,103)] hover:text-white"
                >
                    Search
                </button>
            </div>
            <SearchResults list={games} />
        </div>
    )
}

export default Search