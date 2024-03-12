import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
const gamesRequest = `https://api.rawg.io/api/games?&key=${process.env.RAWG_API_KEY}`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const genre = searchParams.get('genre')
    const platform = searchParams.get('platform')
    const res = await fetch(`${gamesRequest}${genre && `&genres=${genre}`}${platform ? `&platforms=${platform}` : ''}${page !== undefined && `&page=${page}&page_size=20`}`)

    return NextResponse.json(await res.json())
}