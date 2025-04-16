import { IssueStatusBadge } from "@/app/components"
import prisma from "@/prisma/client"
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { HiMiniPencilSquare } from "react-icons/hi2";
import Link from "next/link"


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
        <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "5", md: "0" }} >
            <Box>
                <Heading className="">{issue.title}</Heading>
                <div className="my-2 flex gap-2">
                    <IssueStatusBadge status={issue.status} />
                    <Text as="p" size={"1"}>{issue.createdAt.toDateString()}</Text>
                </div>
                <Card className="prose" mt={"4"}>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box >
                <Button><HiMiniPencilSquare /><Link href={`/issues/${issue.id}/edit`}>Edit Button</Link></Button>
            </Box>
        </Grid>
    )
}
export default IssueDetailPage