export const dynamic = 'force-dynamic' // defaults to auto
const gamesRequest = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

export async function GET() {
    const res = await fetch(`${gamesRequest}&genres=indie`)
    const data = await res.json()
   
    return Response.json({ data })
  }