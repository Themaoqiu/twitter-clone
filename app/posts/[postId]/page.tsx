"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const PostView = () => {
    const { postId } = useParams();
    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost || !fetchedPost.user) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader size={80} color="brightblue" />
            </div>
        );
    };

    return (
        <>
            <Header label="Tweet" showBackArrow />
            <PostItem data={fetchedPost} userId={fetchedPost.user.id} />
            <Form 
                postId={postId as string}
                isComment
                placeholder="Tweet your reply"    
            />
        </>
    );


}

export default PostView;