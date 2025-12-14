import axios from "axios"
import { fetchNews } from "../lib/news.js"
const apiKey = "40c59a6e79fbd98314053bbc6b0a9bb3925a0a77"

async function autoFetchNews() {
    const newsArray = []
    const news = await fetchNews("trending_news", "sports")
    const articles = news.articles

    for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        newsArray.push(element)
        const url = element.url
        const res = await axios.get(`https://extractorapi.com/api/v1/extractor/?apikey=40c59a6e79fbd98314053bbc6b0a9bb3925a0a77&url=${url}`)
        console.log("\n--------------------\n")
        const content = res.data.text
        const article = {
            element,
            content: content
        }
        console.log(article)
        newsArray.push(article)
    }
}

autoFetchNews()