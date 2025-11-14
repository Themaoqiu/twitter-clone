import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    try {
        const { postId } = await req.json();
        const { currentUser } = await serverAuth();

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
        })

        if (!post) {
            throw new Error("Post not found");
        }

        let updatedLikeIds = [...(post.likedIds || [])];
        // 检查是否已存在，避免重复点赞
        if (!updatedLikeIds.includes(currentUser.id)) {
            updatedLikeIds.push(currentUser.id);
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { likedIds: updatedLikeIds },
        });

        try {
            const post = await prisma.post.findUnique({
                where: { id: postId },
            })
            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: "Someone liked your post!",
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: { id: post.userId },
                    data: { hasNotifications: true }
                });
            }
        } catch (error) {
            console.log(error);
        }

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { postId } = await req.json();
        const { currentUser } = await serverAuth();

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
        })

        if (!post) {
            throw new Error("Post not found");
        }

        let updatedLikeIds = [...(post.likedIds || [])];
        updatedLikeIds = updatedLikeIds.filter((likedId) => likedId !== currentUser.id);

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { likedIds: updatedLikeIds },
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}