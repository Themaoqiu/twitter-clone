import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import { toast } from "sonner";

const useLike = ({ postId, userId }: { postId: string; userId: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [fetchedPost?.likedIds, currentUser?.id]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            const currentLikedIds = fetchedPost?.likedIds || [];  
            const currentHasLiked = currentLikedIds.includes(currentUser?.id); 

            let request;

            if (currentHasLiked) {
                request = () => axios.delete(`/api/like`, {data: { postId }});
            } else {
                request = () => axios.post(`/api/like`, { postId });
            }

            const response = await request();
            
            // 用后端返回的最新数据覆盖缓存
            mutateFetchedPost(response.data,true);
            // 强制重新拉取所有 posts
            mutateFetchedPosts(undefined, true);
            
            toast.success("Success");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }, [currentUser, fetchedPost, postId, loginModal, mutateFetchedPost, mutateFetchedPosts]);

    return {
        hasLiked,
        toggleLike,
    };
}

export default useLike;