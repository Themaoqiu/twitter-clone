"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginModal = () => {
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        LoginModal.onClose();
        RegisterModal.onOpen();
    }, [isLoading, RegisterModal, LoginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error(result.error);
                return;
            }

            toast.success("Logged in successfully");
            LoginModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [email, password, LoginModal]);

    const bodycontent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                First time using Twitter?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
                    Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionlabel="Sign In"
            onClose={LoginModal.onClose}
            onSubmit={onSubmit}
            body={bodycontent}
            footer={footerContent}
        />
    )
}

export default LoginModal;