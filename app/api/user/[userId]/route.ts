import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: any }
) {
  const userId = parseInt(params.userId);

  if (isNaN(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { interests: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ interests: user.interests });
  } catch (error) {
    console.error('Error fetching user interests:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
