import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.set(
        'Set-Cookie',
        `authToken=; HttpOnly; Path=/; Max-Age=0; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`
    );

    return response;
}
