"use client"
import styles from "./newIssue.module.css"
import { Button, Callout, Text, TextArea, TextField, } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, FormState, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchema"
import { z } from "zod"
import ErrorMessage from "@/app/component/ErrorMessage"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuesPage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) })
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type="submit">Submit New Issues</Button>
            </form >
        </div>
    )
}
export default NewIssuesPage