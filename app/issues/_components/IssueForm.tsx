"use client"
import { ErrorMessage, Spinner } from "@/app/components"
import { issueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issues } from "@prisma/client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SimpleMdeReact as SimpleMDE } from "react-simplemde-editor"
import { z } from "zod"
import styles from "../Issue.module.css"

type IssueFormType = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issues }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormType>({ resolver: zodResolver(issueSchema) })
    const router = useRouter()
    const [error, setError] = useState<String>("")
    const [isSubmitting, setSubmitting] = useState(false)

    async function onSubmit(data: IssueFormType) {
        try {
            setSubmitting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
                router.push(`/issues/${issue.id}`)
                router.refresh()
                return
            }
            await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (error) {
            setSubmitting(false)
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
                <TextField.Root className={styles.spaceBetween} defaultValue={issue?.title} placeholder="New Issue" {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>
                    {issue ? "Updat Issues" : "Submit New Issues"}{isSubmitting && <Spinner />}</Button>
            </form >
        </div>
    )
}
export default IssueForm