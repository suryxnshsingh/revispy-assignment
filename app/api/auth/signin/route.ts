import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set(
        'Set-Cookie',
        `authToken=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`
    );

    return response;
}
