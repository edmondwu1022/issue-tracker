import { Issues } from "@prisma/client"
import { Button } from "@radix-ui/themes"
import Link from "next/link"
import { HiMiniPencilSquare } from "react-icons/hi2"

const EditIssueButton = ({ issue }: { issue: Issues }) => {
    return (
        <Button><HiMiniPencilSquare /><Link href={`/issues/${issue.id}/edit`}>Edit Button</Link></Button>
    )
}
export default EditIssueButton