import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params;

        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID");
        }

        const notifications = await prisma?.notification.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma?.user.update({
            where: { id: userId },
            data: { hasNotifications: false }
        });

        return NextResponse.json(notifications, { status: 200 });

    } catch (error: any) {
        console.error('[GET /api/notifications/:userId]', error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    }
}