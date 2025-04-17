import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@radix-ui/themes"
import Link from "next/link"


const DeleteIssueButton = ({ issueID }: { issueID: Number }) => {
    return (
        <Button color="red"><RiDeleteBin6Line /><Link href={`/issues/${issueID}/edit`}>Delete Button</Link></Button>
    )
}
export default DeleteIssueButton