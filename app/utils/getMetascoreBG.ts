export default function getMetascoreBG (score: number) {
    if (score >= 60) return 'bg-[rgb(93,203,130)]';
    if (score >= 40) return 'bg-[rgb(245,192,89)]';
    return 'bg-[rgb(237,114,119)]';
}