"use client";

import React, { useMemo } from "react";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: postsRaw, isLoading, error } = usePosts(userId as string);

    // 防御性处理：支持直接返回数组 或 返回 { posts: [...] } 的情况
    const posts = useMemo(() => {
        if (Array.isArray(postsRaw)) return postsRaw;
        if (postsRaw && Array.isArray((postsRaw as any).posts)) return (postsRaw as any).posts;
        return [];
    }, [postsRaw]);

    // 调试用，可以临时打开查看后端结构
    // console.log("postsRaw:", postsRaw);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load posts</div>;
    if (posts.length === 0) return <div>No posts</div>;

    return (
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem 
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
    );
}

export default PostFeed;