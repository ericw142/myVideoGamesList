export default function addGameToList (list: string | undefined, game: { id: number | undefined, name: string | undefined, background_image: string | undefined, rating: string }) {
    let parsedList = [];
    if (list) {
        parsedList = JSON.parse(list);
    }

    parsedList.push(game);

    return JSON.stringify(parsedList);
}