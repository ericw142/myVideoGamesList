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
        <div className='p-4'>
            <p className='font-bold'><button onClick={goToFirstPage}><span className='text-[21px]'>&#171;</span></button>  <button onClick={goToPreviousPage}><span className='text-[21px]'>&#8249;</span></button> {props.page} of {props.totalPages} <button onClick={goToNextPage}><span className='text-[21px]'>&#8250;</span></button>  <button onClick={goToLastPage}><span className='text-[21px]'>&#187;</span></button></p>
        </div>
    )
}

export default Pagination