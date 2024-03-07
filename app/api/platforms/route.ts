import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
const request = `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`;

export async function GET() {
    const res = await fetch(request)
    const platforms = await res.json()
   
    return NextResponse.json({ platforms })
}