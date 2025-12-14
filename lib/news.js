const apiKey = process.env.GNEWS_API_KEY;
const baseUrl = `https://gnews.io/api/v4/{endpoint}?{parameters}&apikey=${apiKey}`;
const topHeadlinesEndpoint = `https://gnews.io/api/v4/top-headlines?category=general&apikey=${apiKey}`;
const searchEndpoint = `https://gnews.io/api/v4/search?q=example&apikey=${apiKey}`;

export async function detectIntent(intent) {
    let url = baseUrl;
    if (intent === "search_news") {
        url = searchEndpoint;
        return url;
    }
    if (intent === "trending_news") {
        url = topHeadlinesEndpoint;
        return url;
    }
    return url
}