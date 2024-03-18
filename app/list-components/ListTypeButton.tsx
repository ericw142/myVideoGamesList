import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    listName: string;
    setSelectedList: Dispatch<SetStateAction<string>>;
}

const ListTypeButton = (props: Props) => {
    return (
        <div className='hover:bg-blue-300 p-2 transition-all' onClick={() => props.setSelectedList(props.listName)}>
            <button
                className="h-[30px]"
            >
                    <p>{props.listName}</p>
            </button>
        </div>
    )
}

export default ListTypeButton