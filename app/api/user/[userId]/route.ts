import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

// Use a singleton pattern to prevent multiple instances in serverless environments
const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId);

  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { interests: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ interests: user.interests });
  } catch (error) {
    console.error("Error fetching user interests:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
