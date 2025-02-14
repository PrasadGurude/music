import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX)
        if (!isYt) {
            return NextResponse.json({
                message: "Wrong Youtube URL format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        const res = await youtubesearchapi.GetVideoDetails(extractedId)
        console.log(res)
        const thumbnails = res.thumbnail.thumbnails
        thumbnails.sort((a: { width: number }, b: { width: number }) => { a.width < b.width ? -1 : 1 })

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Cant find video",
                smallImg: thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.lenght - 1].url ?? "https://3.bp.blogspot.com/-m3qg7mJ7oIs/XIzbeuqovcI/AAAAAAAA1pU/5kSgM-US-scfkke19YoYBYSsDLVG2_U6gCLcBGAs/s1600/28%2BBreathtaking%2BPictures%2BOf%2BWild%2BNature%2BCaptured%2BBy%2BAward-Winning%2BAustrian%2BPhotographer.png",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://3.bp.blogspot.com/-m3qg7mJ7oIs/XIzbeuqovcI/AAAAAAAA1pU/5kSgM-US-scfkke19YoYBYSsDLVG2_U6gCLcBGAs/s1600/28%2BBreathtaking%2BPictures%2BOf%2BWild%2BNature%2BCaptured%2BBy%2BAward-Winning%2BAustrian%2BPhotographer.png",
            }
        })

        return NextResponse.json({
            message: "added stream",
            id: stream.id
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get('creatorId')
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })
    return NextResponse.json({
        message: "list of all streams",
        streams
    })
} 