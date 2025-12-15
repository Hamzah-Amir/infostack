import axios from "axios"
import { fetchNews } from "../lib/news.js"
import { prisma } from "../lib/prisma.js"
const apiKey = "40c59a6e79fbd98314053bbc6b0a9bb3925a0a77"

async function autoFetchNews() {
    const newsArray = []
    const category = 'sports'
    const news = await fetchNews("trending_news", category)
    const articles = news.articles

    for (let index = 0; index < articles.length; index++) {
        let article = articles[index];
        if (!article.content) {
            console.log("Content Not available!")
            continue
        }
        const url = article.url
        const res = await axios.get(`https://extractorapi.com/api/v1/extractor/?apikey=40c59a6e79fbd98314053bbc6b0a9bb3925a0a77&url=${url}`, { timeout: 5000000 })
        const content = res.data.text
        const middleIndex = Math.floor(Math.random() * (res.data.images.length - 2)) + 1;
        const randomMiddleImage = res.data.images[middleIndex];
        const images = [
            res.data.images[0],                  // first
            randomMiddleImage,          // random middle
            res.data.images[res.data.images.length - 1]   // last
        ];

        

        const enrichedArticle = {
            title: article.title,
            description: article.description,
            category: category,
            source_url: article.url,
            source: article.source.name,
            article: content,
            images: images
        }
        newsArray.push(enrichedArticle)
        const db = await prisma.content.create({
            data: enrichedArticle
        })
        console.log(db)
    }
}

autoFetchNews()