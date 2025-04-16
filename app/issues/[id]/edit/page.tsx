import IssueForm from "../../_components/IssueForm"
import FindIssue from "../../_utils/FindIssue"

interface Props {
    params: { id: string }
}

const page = async ({ params }: Props) => {
    const { id } = await params
    const issue = await FindIssue(id)

    return (
        <IssueForm issue={issue} />
    )
}
export default page