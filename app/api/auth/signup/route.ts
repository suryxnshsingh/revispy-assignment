// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });
    
        const response = NextResponse.json({ message: "Registration successful" });
        response.headers.set(
            'Set-Cookie',
            `authToken=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`
        );

        return response;
    } catch (error) {
        return NextResponse.json({ message: "User registration failed", error }, { status: 500 });
    }
}
