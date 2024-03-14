import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    listName: string;
    setSelectedList: Dispatch<SetStateAction<string>>;
}

const ListTypeButton = (props: Props) => {
    return (
        <div>
            <button
                className="h-[30px] border-solid border-r-2 border-black p-2"
                onClick={() => props.setSelectedList(props.listName)}
            >
                    <p className='text-[14px]'>{props.listName}</p>
            </button>
        </div>
    )
}

export default ListTypeButton