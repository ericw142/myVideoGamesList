export default function getMetascoreTagline (score: number) {
    if (score >= 80) return 'Universal Acclaim';
    if (score >= 60) return 'Generally favorable';
    if (score >= 40) return 'Mixed or Average';
    if (score >= 20) return 'Generally unfavorable';
    return 'Overwhelming Disapproval'
}