import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const articles = await prisma.content.findMany({
        where: {
            category: 'sports'
        }
    })

    return new Response(JSON.stringify(articles))
}

export async function POST(req) {
    await prisma.content.create({
        data: {
            title: title,
            description: desc,
            category: category,
            raw_data: {
                content: article,
                url: sourceUrl,
                image: imageUrl,
                publishedAt: publishedAt
            },
        }
    })
}