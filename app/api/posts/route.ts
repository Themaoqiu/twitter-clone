import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        let posts;

        if (userId && typeof userId === 'string') {
            posts = await prisma.post.findMany({
                where: { userId },
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth();
        const body = await req.json();

        const post = await prisma.post.create({
            data: {
                // 如果 Form 传入的 body 已经是 { body: "..." }
                // 那么应该解构出 body，而不是直接用 body
                body: body.body, 
                userId: currentUser.id
            }
        })
        return NextResponse.json({ post }, { status: 200 });

    } catch (error: any) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message || 'Bad Request' }, { status: 400 });
    }

}