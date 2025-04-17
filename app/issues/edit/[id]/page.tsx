import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import IssueFormPreload from "../../_components/IssueFormPreload"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) {
        notFound()
    }

    return (
        <IssueFormPreload issue={issue} />
    )
}
export default page