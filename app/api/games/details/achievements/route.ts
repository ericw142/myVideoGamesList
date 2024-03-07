import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const res = await fetch(`https://api.rawg.io/api/games/${slug}/achievements?key=${process.env.RAWG_API_KEY}`)

    const achievements = await res.json()
   
    return NextResponse.json({ achievements })
}