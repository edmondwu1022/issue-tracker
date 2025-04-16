import prisma from "@/prisma/client"
import IssueForm from "../../_components/IssueForm"
import { notFound } from "next/navigation"

interface Props {
    params: { id: string }
}

const page = async ({ params }: Props) => {
    const { id } = await params
    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) {
        notFound()
    }

    return (
        <IssueForm issue={issue} />
    )
}
export default page