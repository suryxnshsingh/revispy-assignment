import React from 'react';
import LogoutButton from '../components/LogoutButton';
import CategorySelection from '@/components/CategorySelection';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const Page = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    let userId: number | null = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
            userId = decoded.id;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    return (
        <div>
            <div className="flex justify-end m-4  "><LogoutButton /></div>
            <div className="flex flex-col justify-center items-center">
                <div className="sm:border-[1px] border-0 border-[#c1c1c1] w-full sm:w-[35svw] rounded-2xl">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold my-6 text-center">Please mark your interests!</h1>
                        <p className="text-center">We will keep you notified.</p>
                        <hr className="w-[30svw] mt-2 mb-8"/>
                    </div>
                    <p className="text-lg font-semibold ml-12">My saved Interests!</p>
                    {userId !== null ? ( 
                        <CategorySelection userId={userId} />
                    ) : (
                        <p className="text-center text-red-500">You must be logged in to view categories.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
