import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const body = await req.json()
    const validate = issueSchema.safeParse(body)
    if (!validate.success)
        return NextResponse.json({ error: validate.error.errors }, { status: 400 })
    const { id } = await params

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue can't find" }, { status: 404 })
    }

    const updatedIssue = await prisma.issues.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
        }
    })

    return NextResponse.json({ updatedIssue }, { status: 200 })
}