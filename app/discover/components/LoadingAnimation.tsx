const LoadingAnimation = () => {
    return (
        <div>
            <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
            <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-[rgb(127,187,103)] border-t-transparent shadow-md"></div>
        </div>
    )
}

export default LoadingAnimation