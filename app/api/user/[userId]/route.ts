import { type NextRequest } from 'next/server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Context = {
  params: {
    userId: string
  }
}

export async function GET(request: NextRequest, context: Context) {
    const userId = parseInt(context.params.userId);

    if (isNaN(userId)) {
        return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { interests: true },
        });

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        return Response.json({ interests: user.interests });
    } catch (error) {
        console.error("Error fetching user interests:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}