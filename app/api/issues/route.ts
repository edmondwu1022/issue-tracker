import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const validate = issueSchema.safeParse(body)
    if (!validate.success) {
        return NextResponse.json(validate.error.errors, { status: 400 })
    }
    const newIssues = await prisma.issues.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })

    return NextResponse.json(newIssues, { status: 201 })
}