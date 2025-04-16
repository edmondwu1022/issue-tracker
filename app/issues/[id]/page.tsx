import { Box, Grid } from "@radix-ui/themes"
import EditIssueButton from "./EditIssueButton"
import IssueDetail from "./IssueDetail"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params
    const issue = await prisma.issues.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) {
        notFound()
    }
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "5", md: "0" }} >
            <Box>
                <IssueDetail issue={issue} />
            </Box>
            <Box >
                <EditIssueButton issueID={issue.id} />
            </Box>
        </Grid>
    )
}
export default IssueDetailPage