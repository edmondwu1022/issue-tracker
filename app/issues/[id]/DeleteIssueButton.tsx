"use client"
import { AlertDialog, Box, Button, Container, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteIssueButton = ({ issueID }: { issueID: Number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)

    const onComfirmButtonClick = () => {
        try {
            axios.delete(`/api/issues/${issueID}`)
            router.push("/issues")
            router.refresh()
        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    return (
        <>
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
                            <Button color="red" onClick={onComfirmButtonClick}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Error Hadler */}
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title >Error</AlertDialog.Title>
                    <AlertDialog.Description >Something went wrong. Please try again.</AlertDialog.Description>
                    <AlertDialog.Cancel  >
                        <Button mt="5" color="gray" onClick={() => setError(false)}>Close</Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
export default DeleteIssueButton