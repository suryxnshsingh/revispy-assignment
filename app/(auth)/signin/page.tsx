'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const res = await axios.post('/api/auth/signin', {
                email,
                password,
            });
    
            if (res.status === 200) {
                console.log("Login successful:", res.data);
                router.push("/");
            } else {
                console.error("Login failed:", res.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="md:border-[1px] border-[#c1c1c1] w-full border-0 sm:w-[35svw] rounded-2xl h-[70svh] mt-[3%] flex flex-col justify-center items-center ">
                    <h1 className="text-3xl font-bold mb-8">Login</h1>
                    <p className="text-lg font-semibold dark:text-[#c1c1c1]">Welcome back to ECOMMERCE</p>
                    <p className="">The next gen business marketplace</p>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <p className="pb-1 pt-4 dark:text-[#c1c1c1]">Email</p>
                        <input 
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-[svw] sm:w-[30svw] py-2 px-2" 
                            required />

                        <p className="pb-1 pt-4 dark:text-[#c1c1c1]">Password</p>
                        <input 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-[svw] sm:w-[30svw] py-2 px-2" 
                            required />
                        <button 
                            type="submit"
                            className="bg-black text-white dark:bg-neutral-800 py-3 mt-8 rounded-sm">LOGIN</button>
                    </form>
                    <hr className="w-[30svw] mt-8"/>
                    <div className="mt-8 text-[#333333] dark:text-[#c1c1c1]">Don't have an account? <Link href="/signup" className="text-black dark:text-white">SIGNUP</Link></div>
            </div>
        </div>
    );
};

export default SignIn;