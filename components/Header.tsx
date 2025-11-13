"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
    label: string,
    showBackArrow?: boolean,
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
    const router = useRouter();

    // 用useCallback只在依赖数组[router]变化时才重新创建
    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className="border-b border-neutral-800 p-5 ">
            <div className="flex flex-row item-center gap-2">
                {showBackArrow && (
                    <BiArrowBack onClick={handleBack} color="white" size={20} className="cursor-pointer hover:opacity-70 transition" />
                )}
                <h1 className="text-white text-xl font-semibold">
                    {label}
                </h1>
            </div>

        </div>
    )
}

export default Header;