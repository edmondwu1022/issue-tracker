import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import { PropsWithChildren } from "react"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params

    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue)
        notFound()

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}
export default IssueDetailPage