// 用来处理 /api/users/[userid] 路径的 GET 请求

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(_: Request, { params }: { params: { userid: string } }) {
    try {
        const { userid } = await params;
        if (!userid || typeof userid !== "string") {
            throw new Error("Invalid user ID");
        }

        const existingUser = await prisma.user.findUnique({
            where: {id: userid}
        })
        
        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userid
                }
            }
        })

        return NextResponse.json({ ...existingUser, followersCount }, { status: 200 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}