import authOption from "@/app/auth/authOption";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOption)
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const validate = patchIssueSchema.safeParse(body)
    if (!validate.success)
        return NextResponse.json({ error: validate.error.errors }, { status: 400 })
    const { id } = await params

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue can't find" }, { status: 404 })
    }

    const { title, description, assigneeToUserId } = body

    if (assigneeToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assigneeToUserId }
        })
        if (!user)
            return NextResponse.json({ error: "Invalid user" }, { status: 404 })
    }

    const updatedIssue = await prisma.issues.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assigneeToUserId
        }
    })

    return NextResponse.json({ updatedIssue }, { status: 200 })
}

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOption)
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) {
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })
    }

    await prisma.issues.delete({
        where: { id: issue.id }
    })

    return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 })
}

