import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        const { currentUser } = await serverAuth();

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [])];

        updatedFollowingIds.push(userId);

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { followingIds: updatedFollowingIds },
        });

        return NextResponse.json({ updatedUser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error following user" }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await req.json();
        const { currentUser } = await serverAuth();

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [])];

        updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { followingIds: updatedFollowingIds },
        });

        return NextResponse.json({ updatedUser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Error following user" }, { status: 400 });
    }
}