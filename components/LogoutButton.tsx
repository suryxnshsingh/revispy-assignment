"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/signin');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return <button 
        onClick={handleLogout} 
        className=" bg-black dark:bg-white rounded-md dark:text-black text-white px-4 py-2"
        >Logout</button>;
};

export default LogoutButton;
