'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await axios.post("/api/auth/signup", { name, email, password });
            if (res.status === 200) {
                toast({
                    title: "Success!",
                    description: "Account created successfully. Redirecting...",
                });
                router.push("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "An error occurred during registration";
                setError(errorMessage);
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: errorMessage,
                });
            } else {
                const errorMessage = "An unexpected error occurred";
                setError(errorMessage);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorMessage,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="md:border-[1px] border-[#c1c1c1] w-full sm:w-[35svw] rounded-2xl h-[70svh] mt-[3%] flex flex-col justify-center items-center space-y-4">
                <h1 className="text-3xl font-bold">Create Your Account</h1>

                {error && (
                    <Alert variant="destructive" className="w-[30svw]">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[30svw]">
                    <p className="pb-1 pt-4 dark:text-[#c1c1c1]">Name</p>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Name" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-full py-2 px-2" 
                        disabled={isLoading}
                        required 
                    />
                    <p className="pb-1 pt-4 dark:text-[#c1c1c1]">Email</p>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-full py-2 px-2" 
                        disabled={isLoading}
                        required 
                    />
                    <p className="pb-1 pt-4 dark:text-[#c1c1c1]">Password</p>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="border-[1px] border-[#c1c1c1] dark:bg-neutral-900 rounded-sm w-full py-2 px-2" 
                        disabled={isLoading}
                        required 
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-black dark:bg-neutral-800 text-white py-3 mt-8 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'CREATE ACCOUNT'
                        )}
                    </button>
                </form>
                <div className="text-[#333333] dark:text-[#c1c1c1]">
                    Have an account? <Link href="/signin" className="text-black dark:text-white">LOGIN</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;