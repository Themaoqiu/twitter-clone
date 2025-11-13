"use client";

import { BsHourglass } from "react-icons/bs";
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTwitterButton from "./SidebarTwitterButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: AiFillHome
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsHourglass
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser
        }
    ]

    const handleLogout = () => {
        signOut();
        toast.success("Logged out successfully");
    }

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6"> 
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem key={item.href} label={item.label} href={item.href} icon={item.icon} />
                    ))}
                    {currentUser && (
                        <SidebarItem onClick={handleLogout} icon={BiLogOut} label="Logout"/>
                    )}
                    <SidebarTwitterButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;