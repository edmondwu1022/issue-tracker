import { Box, Flex, Grid } from "@radix-ui/themes"
import EditIssueButton from "./EditIssueButton"
import IssueDetail from "./IssueDetail"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import DeleteIssueButton from "./DeleteIssueButton"
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption"
import AssigneeSelect from "./AssigneeSelect"
import { cache } from "react"

interface Props {
    params: Promise<{ id: string }>
}

const fetchUser = cache(async (id: number) => {
    return await prisma.issues.findUnique({
        where: { id: id }
    })

})

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOption)
    const { id } = await params
    const issue = await fetchUser(parseInt(id))

    if (!issue) {
        notFound()
    }
    return (
        <Grid columns={{ initial: "1", sm: "4", md: "6" }} gap={{ initial: "5", sm: "5", md: "0" }} >
            <Box gridColumnStart="1" gridColumnEnd={{ initial: "1", sm: "4", md: "5" }} >
                <IssueDetail issue={issue} />
            </Box>
            {session &&
                <Flex direction={"column"} gap={{ initial: "4" }} gridColumnStart={{ initial: "1", sm: "4", md: "6" }} gridColumnEnd={{ initial: "1", sm: "5", md: "7" }} >
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueID={issue.id} />
                    <DeleteIssueButton issueID={issue.id} />
                </Flex>
            }
        </Grid >
    )
}

export const generateMetadata = async ({ params }: Props) => {
    const { id } = await params
    const issue = await fetchUser(parseInt(id))

    return {
        title: `Issue Tracker - ${issue?.title}`,
        description: `A detail for  ${issue?.title} issue`,
    }
}
export default IssueDetailPage