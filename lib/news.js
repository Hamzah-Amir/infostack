import axios from "axios";

const apiKey = "99b85493dd05413b10eb1150dc5efe7e"; //process.env.GNEWS_API_KEY;
const topHeadlinesEndpoint = `https://gnews.io/api/v4/top-headlines?lang=en&apikey=${apiKey}`
const searchEndpoint = `https://gnews.io/api/v4/search?category=sports&lang=en&q="barcelona-vs-chelsea"&apikey=${apiKey}`;

export async function detectIntent(intent) {
    let url
    if (intent === "search_news") {
        url = searchEndpoint;
        return url;
    }
    if (intent === "trending_news") {
        url = topHeadlinesEndpoint;
        console.log("selected trending news url:")
        return url;
    }
    return url
}
export async function fetchNews(intent, category, query) {
    try {
        const url = await detectIntent(intent);

        const params = {
            category,
            max: 20,
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