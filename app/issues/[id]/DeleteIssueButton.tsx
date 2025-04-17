"use client"
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteIssueButton = ({ issueID }: { issueID: Number }) => {
    const router = useRouter()
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red"><RiDeleteBin6Line />Delete Button</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Comformation</AlertDialog.Title>
                <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
                <Flex gap={"4"} mt={"5"}>
                    <AlertDialog.Cancel>
                        <Button color="gray" >Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red" onClick={() => {
                            axios.delete(`/api/issues/${issueID}`)
                            router.push("/issues")
                            router.refresh()
                        }}>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
export default DeleteIssueButton