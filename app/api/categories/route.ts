import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = 6;
    const skip = (page - 1) * pageSize;

    const categories = await prisma.category.findMany({
        skip,
        take: pageSize,
    });

    const totalCategories = await prisma.category.count();
    return NextResponse.json({
        categories,
        totalPages: Math.ceil(totalCategories / pageSize),
    });
}
