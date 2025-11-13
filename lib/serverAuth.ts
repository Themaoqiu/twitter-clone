import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import prisma from "@/lib/prismadb";

const serverAuth = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
        throw new Error('Not Signed In');
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!currentUser) {
        throw new Error('Not Signed In');
    }

    return { currentUser };
};

export default serverAuth;