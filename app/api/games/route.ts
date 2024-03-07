import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
const gamesRequest = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const res = await fetch(`${gamesRequest}${genre ? `&genres=${genre}` : ''}`)

    const games = await res.json()
   
    return NextResponse.json({ games })
}