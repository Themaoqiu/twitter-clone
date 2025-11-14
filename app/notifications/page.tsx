import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotificationsFeed from "@/components/NotificationsFeed";

const NotificationsView = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    return (
        <>
            <Header label="Notifications" showBackArrow />
            <NotificationsFeed />
        </>
    );
}

export default NotificationsView;