import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ postId: string }> 
}) {
    try {
        const { postId } = await params;

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                user: true,
                comments: {
                    include: { user: true },
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Error fetching post" }, { status: 400 });
    }
}