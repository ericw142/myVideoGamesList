import Image from "next/image"

export default function ComingSoon() {
    return (
        <div>
            <Image className='hidden sm:block absolute w-full h-full object-cover' fill={true} src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
        </div>
    )
}