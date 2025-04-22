import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: "asc"
            }
        })
        if (!users) {
            return NextResponse.json("No users found", { status: 404 })
        }
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json("Error fetching users", { status: 500 })
    }
}