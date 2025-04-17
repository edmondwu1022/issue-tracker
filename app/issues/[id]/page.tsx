import { Box, Flex, Grid } from "@radix-ui/themes"
import EditIssueButton from "./EditIssueButton"
import IssueDetail from "./IssueDetail"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import DeleteIssueButton from "./DeleteIssueButton"

interface Props {
    params: Promise<{ id: string }>
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
        <Grid columns={{ initial: "1", sm: "4", md: "6" }} gap={{ initial: "5", sm: "5", md: "0" }} >
            <Box gridColumnStart="1" gridColumnEnd={{ initial: "1", sm: "4", md: "5" }} >
                <IssueDetail issue={issue} />
            </Box>
            <Flex direction={"column"} gap={{ initial: "4" }} gridColumnStart={{ initial: "1", sm: "4", md: "6" }} gridColumnEnd={{ initial: "1", sm: "5", md: "7" }} >
                <EditIssueButton issueID={issue.id} />
                <DeleteIssueButton issueID={issue.id} />
            </Flex>
        </Grid >
    )
}
export default IssueDetailPage