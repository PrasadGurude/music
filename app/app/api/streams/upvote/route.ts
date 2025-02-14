import { getServerSession } from "next-auth";
import {prismaClient} from  '@/app/lib/db'
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const UpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req:NextRequest) {
    const session =await getServerSession();
    //TODO = You can get rid of the db call here
    const user = await prismaClient.user.findFirst({
        where:{
            email:session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message:"Unauthenticated"
        },{
            status:403
        })
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data:{
                userId:user.id,
                streamId:data.streamId
            }
        })
    } catch (error) {
        return NextResponse.json({
            message:"error while upvoting"
        },{
            status:403
        })
    }

}