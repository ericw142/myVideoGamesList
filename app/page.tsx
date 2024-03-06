/* eslint-disable @next/next/no-img-element */
"use client"

export default function Home() {
    return (
        <div>
            <img className='hidden sm:block absolute w-full h-full object-cover' src="/george-kedenburg-iii-v4UVbVgsW-4-unsplash.jpg" alt="movie_background"/>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                Home
            </main>
        </div>
    );
}
