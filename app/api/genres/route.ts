import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
const request = `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`;

export async function GET() {
    const res = await fetch(request)
    const genres = await res.json()
   
    return NextResponse.json({ genres })
}