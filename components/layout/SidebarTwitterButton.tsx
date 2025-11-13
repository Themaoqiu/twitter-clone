"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTwitterButton = () => {
    const router = useRouter();
    const LoginModal = useLoginModal();
    const onClick = useCallback(() => {
        LoginModal.onOpen();
    }, [LoginModal]);

    return (
        <div onClick={onClick}>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-sky-400 hover:bg-opacity-90 cursor-pointer transition-colors">
                <FaFeather size={24} color="white"/>
            </div>
            <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 hover:bg-opacity-90 cursor-pointer transition-colors">
                <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
                    Twitter
                </p>
            </div>
        </div>
    )
}
export default SidebarTwitterButton;