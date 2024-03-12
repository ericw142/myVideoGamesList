import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&&search=${search}`)

    return NextResponse.json(await res.json())
}