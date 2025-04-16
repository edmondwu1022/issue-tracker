"use client"
import dynamic from "next/dynamic"
import ErrorMessage from "@/app/component/ErrorMessage"
import Spinner from "@/app/component/Spinner"
import { createIssueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Callout, TextField } from "@radix-ui/themes"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import styles from "./newIssue.module.css"

const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuesPage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) })
    const router = useRouter()
    const [error, setError] = useState<String>("")
    const [isSubmitting, setSubmitting] = useState(false)

    async function onSubmit(data: IssueForm) {
        try {
            setSubmitting(true)
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
                <TextField.Root className={styles.spaceBetween} placeholder="New Issue" {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>Submit New Issues{isSubmitting && <Spinner />}</Button>
            </form >
        </div>
    )
}
export default NewIssuesPage