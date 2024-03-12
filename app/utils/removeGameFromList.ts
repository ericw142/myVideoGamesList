export default function removeGameFromList (list: string | undefined, gameIndex: number) {
    if (!list) return '';

    const parsedList = JSON.parse(list);
    parsedList.splice(gameIndex, 1);

    return JSON.stringify(parsedList);
}