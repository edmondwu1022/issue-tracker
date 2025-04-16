import { Box, Grid } from "@radix-ui/themes"
import FindIssue from "../_utils/FindIssue"
import EditIssueButton from "./EditIssueButton"
import IssueDetail from "./IssueDetail"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params
    const issue = await FindIssue(id)
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