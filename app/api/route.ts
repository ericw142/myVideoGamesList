export const dynamic = 'force-dynamic' // defaults to auto
const gamesRequest = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

export async function GET() {
    const action = await fetch(`${gamesRequest}&genres=action`)
    const indie = await fetch(`${gamesRequest}&genres=indie`)

    const actionJson = await action.json()
    const indieJson = await indie.json()
   
    return Response.json({ action: actionJson, indie: indieJson })
  }