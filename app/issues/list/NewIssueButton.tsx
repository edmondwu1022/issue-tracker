import { Button } from "@radix-ui/themes"
import Link from "next/link"

const NewIssueButton = () => {
    return (
        <div >
            <Button><Link href="/issues/new">New</Link></Button>
        </div>
    )
}
export default NewIssueButton