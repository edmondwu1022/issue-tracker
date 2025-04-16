import prisma from "@/prisma/client"
import { notFound } from "next/navigation"

const FindIssue = async (id: string) => {
    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue)
        notFound()

    return issue
}

export default FindIssue