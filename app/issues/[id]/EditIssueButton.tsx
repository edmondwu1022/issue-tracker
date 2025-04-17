import { Button } from "@radix-ui/themes"
import Link from "next/link"
import { HiMiniPencilSquare } from "react-icons/hi2"

const EditIssueButton = ({ issueID }: { issueID: Number }) => {
    return (
        <Button><HiMiniPencilSquare /><Link href={`/issues/${issueID}/edit`}>Edit Button</Link></Button>
    )
}
export default EditIssueButton