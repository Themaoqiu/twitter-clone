import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth();
        const body = await req.json();
        const { name, username, bio, profileImage, coverImage } = body;
        
        if (!name || !username) {
            return NextResponse.json({ error: "Name and username are required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}