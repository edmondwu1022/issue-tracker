"use client"
import styles from "./newIssue.module.css"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const NewIssuesPage = () => {
    return (
        <div className={styles.textDiv}>
            <TextField.Root placeholder="New Issue" className={styles.spaceBetween}></TextField.Root>
            <SimpleMDE placeholder="Description" />
            <Button >Submit New Issues</Button>
        </div>
    )
}
export default NewIssuesPage