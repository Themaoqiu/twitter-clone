"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon: Icon, onClick, auth }) => {
    const { data: currentUser } = useCurrentUser();
    const LoginModal = useLoginModal();
    const router = useRouter();
    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }

        if (auth && !currentUser) {
            LoginModal.onOpen();
        } else if (href) {
            router.push(href);
        }
    }, [onClick, href, router, auth, currentUser, LoginModal])

    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex item-center justify-center p-4 hover:bg-neutral-800 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color="white" />
            </div>
            <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-neutral-800 hover:bg-opacity-10 cursor-pointer">
                <Icon size={24} color="white" />
            <div className="hidden lg:block text-white text-xl font-semibold">
                {label}
            </div>
            </div>
        </div>
    )
}

export default SidebarItem;