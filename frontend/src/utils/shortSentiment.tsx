export function getShortSentiment(sentiment: string) {
return sentiment.split(" ")[0].toLocaleLowerCase().replaceAll('.', '').trim();
}