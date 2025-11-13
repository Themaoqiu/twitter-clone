import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import FollowBar from "@/components/layout/FollowBar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "@/components/ui/sonner";
import EditModal from "@/components/modals/EditModal";

export const metadata: Metadata = {
  title: "twitter-clone",
  description: "A Twitter clone built with Next.js and TypeScript",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html>
      <body>
        <div className="h-screen bg-black">
          <RegisterModal />
          <LoginModal />
          <EditModal />
          <div className="container mx-auto h-full xl:px-30 max-w-8xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
                <Toaster position="top-center" richColors />
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
