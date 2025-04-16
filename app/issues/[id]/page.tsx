import { IssueStatusBadge } from "@/app/components"
import prisma from "@/prisma/client"
import { Card, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

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
        <div className="prose prose-xl">
            <Heading className="">{issue.title}</Heading>
            <div className="my-2 flex gap-2">
                <IssueStatusBadge status={issue.status} />
                <Text as="p" size={"1"}>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card className="prose" mt={"4"}>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div >
    )
}
export default IssueDetailPage