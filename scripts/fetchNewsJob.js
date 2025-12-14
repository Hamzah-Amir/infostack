import { fetchNews } from "../lib/news.js"

async function autoFetchNews() {
    const newsArray = []
    const news = await fetchNews("trending_news", "sports")
    const articles = news.articles
    console.log(news)

    for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        console.log("-----------------------------------------\n")
        console.log(element)
    }
    
}

autoFetchNews()