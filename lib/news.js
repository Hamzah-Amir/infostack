import axios from "axios";

const apiKey = "430298b198374d37a64a3a86c6447563"; //process.env.GNEWS_API_KEY;
const topHeadlinesEndpoint = `https://newsapi.org/v2/top-headlines?lang=en&apikey=${apiKey}`
const searchEndpoint = `https://newsapi.org/v2/everything?category=sports&lang=en&q="barcelona-vs-chelsea"&apikey=${apiKey}`;

export async function detectIntent(intent) {
    let url
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
export async function fetchNews(intent, category, query) {
    try {
        const url = await detectIntent(intent);

        const params = {
            category,
            pageSize: 3,
            lang: 'en'
        };

        if (intent === 'search_news' && query) {
            params.q = `"${query}"`; // encode special characters if needed
        }

        const response = await axios.get(url, { params });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
}