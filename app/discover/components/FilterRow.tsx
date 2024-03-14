import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    filterName: string;
    setFilter: Dispatch<SetStateAction<string>>;
    options: Array<any>;
    disabled?: boolean;
}

const FilterRow = (props: Props) => {
    return (
        <div className='grid grid-cols-3 border-t-[1px] border-black p-2'>
            <div className='col-span-1'>
                <p>{props.filterName}</p>
            </div>
            <div className='col-span-2'>
                <select
                    className='bg-white w-full h-full border-2 rounded focus:border-blue-500 p-2'
                    disabled={props.disabled === undefined ? false: props.disabled}
                    onChange={(e) => {
                        props.setFilter(e.currentTarget.value)
                    }}
                >
                    {props.options.map((el: any, i: number) => (
                        <option key={`${props.filterName}-option-${i}`} value={el.id}>{el.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default FilterRow