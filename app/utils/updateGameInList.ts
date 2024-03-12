export default function updateGameInList (list: string | undefined, gameIndex: number, updatedGame: any) {
    if (!list) return '';

    const parsedList = JSON.parse(list);
    parsedList[gameIndex] = updatedGame;

    return JSON.stringify(parsedList);
}