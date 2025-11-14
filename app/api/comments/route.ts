import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth();
        const { body, postId } = await req.json();

        if (!body || typeof body !== "string") {
            return NextResponse.json({ error: 'Invalid comment body' }, { status: 400 });
        }
        if (!postId || typeof postId !== "string") {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const comment = await prisma?.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            },
        });

        try {
            const post = await prisma.post.findUnique({
                where: { id: postId },
            })
            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: "Someone replied to your post!",
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

        return NextResponse.json(comment, { status: 201 });
    } catch (error: any) {
        console.error('[POST /api/comments]', error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    }
}