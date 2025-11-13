import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { toast } from "sonner";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [currentUser?.followingIds, userId]);

    // 切换关注状态，关注或取消关注
    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (isFollowing) {
                request = () => axios.delete(`/api/follow`, { data: { userId } });
            } else {
                request = () => axios.post(`/api/follow`, { userId });
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success(isFollowing ? "Unfollowed user" : "Followed user successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }, [currentUser, loginModal, isFollowing, mutateCurrentUser, mutateFetchedUser, userId]);
    return { isFollowing, toggleFollow };
}

export default useFollow;