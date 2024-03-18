import React, { Dispatch, SetStateAction } from 'react'

export interface Props {
    page: number;
    totalPages: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = (props: Props) => {
    const goToPreviousPage = () => {
        if (props.page === 1) return;
        const prev = props.page - 1;
        props.setPage(prev);
    }

    const goToNextPage = () => {
        if (props.page === props.totalPages) return;
        const next = props.page + 1;
        props.setPage(next);
    }

    const goToFirstPage = () => {
        props.setPage(1)
    }

    const goToLastPage = () => {
        props.setPage(props.totalPages)
    }

    return (
        <div className='p-4 flex flex-row justify-center'>
            <button className='pagination-button' onClick={goToFirstPage}><span>&#171;</span></button>
            <button className='pagination-button' onClick={goToPreviousPage}><span>&#8249;</span></button>
            <p className='font-bold mt-2 mx-4'>{props.page} of {props.totalPages}</p>
            <button className='pagination-button' onClick={goToNextPage}><span>&#8250;</span></button>
            <button className='pagination-button' onClick={goToLastPage}><span>&#187;</span></button>
        </div>
    )
}

export default Pagination