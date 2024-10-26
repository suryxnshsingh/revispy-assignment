'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/auth/signup", { name, email, password });
            if (res.status === 200) {
                console.log("Registration successful:", res.data);
                router.push("/");
            } else {
                console.error("Registration failed:", res.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Sign-up failed:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="md:border-[1px] border-[#c1c1c1] w-full sm:w-[35svw] rounded-2xl h-[70svh] mt-[3%] flex flex-col justify-center items-center ">
                <h1 className="text-3xl font-bold mb-4">Create Your Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <p className="pb-1 pt-4">Name</p>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Name" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-[svw] sm:w-[30svw] py-2 px-2" 
                        required 
                    />
                    <p className="pb-1 pt-4">Email</p>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-[svw] sm:w-[30svw] py-2 px-2" 
                        required 
                    />
                    <p className="pb-1 pt-4">Password</p>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-[svw] sm:w-[30svw] py-2 px-2" 
                        required 
                    />
                    <button 
                        type="submit"
                        className="bg-black dark:bg-neutral-800 text-white dark:text-white py-3 mt-8 rounded-sm"
                    >
                        CREATE ACCOUNT
                    </button>
                </form>
                <div className="mt-8 text-[#333333] dark:text-[#c1c1c1]">
                    Have an account? <Link href="/signin" className="text-black dark:text-white">LOGIN</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
