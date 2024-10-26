import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { userId, interests } = await request.json(); // Ensure "interests" is being read

    // Validate inputs
    if (!userId || !Array.isArray(interests)) {
        return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                interests: {
                    set: interests.map((categoryId: number) => ({ id: categoryId })),
                },
            },
        });

        return NextResponse.json({ message: "Interests updated successfully" });
    } catch (error) {
        console.error("Error updating interests:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
