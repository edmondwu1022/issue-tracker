"use client"
import styles from "./newIssue.module.css"
import { Button, TextArea, TextField, } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

interface IssueForm {
    title: string,
    description: string
}

const NewIssuesPage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter()

    async function onSubmit(data: IssueForm) {
        try {
            const req = await fetch("/api/issues",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            )
            if (!req.ok) throw new Error()

            router.push("/issues")
        } catch (error) {

        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.textDiv}>
            <TextField.Root className={styles.spaceBetween} placeholder="New Issue" {...register("title")} />
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <Button type="submit">Submit New Issues</Button>
        </form >
    )
}
export default NewIssuesPage