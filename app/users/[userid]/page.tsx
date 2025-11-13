"use client";

import Header from "@/components/Header"
import useUser from "@/hooks/useUser";
import { BiLoader } from "react-icons/bi";
import { use } from "react";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = ({ params }: { params: Promise<{ userid: string }> }) => {
    const { userid } = use(params);
    const { data: fetchedUser, isLoading } = useUser(userid as string);
    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <BiLoader size={80} color="lightblue" />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userid as string} />
            <UserBio userId = {userid as string} />
            <PostFeed userId={userid as string} />
        </>
    )
}

export default UserView;