import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
const gamesRequest = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

export async function GET(request: Request) {
    const res = await fetch(`${gamesRequest}&ordering=-metacritic`)

    const games = await res.json()
   
    return NextResponse.json({ games })
}