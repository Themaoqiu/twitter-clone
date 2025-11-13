"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        setProfileImage(currentUser?.profileImage || "");
        setCoverImage(currentUser?.coverImage || "");
        setName(currentUser?.name || "");
        setUsername(currentUser?.username || "");
        setBio(currentUser?.bio || "");

    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {name, username, bio, profileImage, coverImage});

            mutateFetchedUser();
            
            toast.success("Profile updated successfully");
            editModal.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal]);

    const bodycontent = (
        <div className="flex flex-col gap-4">
            <ImageUpload 
                value={profileImage}
                onChange={(image) => setProfileImage(image)}
                disabled={isLoading}
                label="Upload profile image"
            />
            <ImageUpload 
                value={coverImage}
                onChange={(image) => setCoverImage(image)}
                disabled={isLoading}
                label="Upload cover image"
            />
            <Input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
            />
            <Input 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
            />
            <Input 
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionlabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}   
            body={bodycontent} 
        />
    )
};

export default EditModal;