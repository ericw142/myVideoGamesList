/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import SearchResultItem from './SearchResultItem';


export interface Props {
    list: Array<any>;
    setSlug: Dispatch<SetStateAction<string>>;
}

const SearchResults = (props: Props) => {
    const [viewOptions, setViewOptions] = useState<Array<number>>([])

    useEffect(() => {
        setViewOptions([])
    }, [props.list])

    const showOptions = (key: number) => {
        const temp = [...viewOptions];
        const index = temp.indexOf(key);
        if (index !== -1) {
            temp.splice(index, 1);
        } else {
            temp.push(key)
        }
        setViewOptions(temp)
    }

    return (
        <div>
            {props.list.map((el: any, i: number) => {
                return (
                    <SearchResultItem key={`search-results-item-${i}`} index={i} el={el} showOptions={showOptions} viewOptions={viewOptions} setSlug={props.setSlug}/>
                )
            })}
        </div>
    )
}

export default SearchResults