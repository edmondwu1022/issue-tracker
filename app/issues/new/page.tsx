"use client"
import styles from "./newIssue.module.css"
import { Button, Callout, TextArea, TextField, } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"

interface IssueForm {
    title: string,
    description: string
}

const NewIssuesPage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter()
    const [error, setError] = useState<String>("")

    async function onSubmit(data: IssueForm) {
        try {
            await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (error) {
            setError("An unexpected error occurred")
        }
    }
    return (
        <div className={styles.textDiv}>
            {error &&
                <Callout.Root color="red" className="mb-2">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root className={styles.spaceBetween} placeholder="New Issue" {...register("title")} />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <Button type="submit">Submit New Issues</Button>
            </form >
        </div>
    )
}
export default NewIssuesPage