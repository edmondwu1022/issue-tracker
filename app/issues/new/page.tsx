import styles from "./newIssue.module.css"
import { Button, TextArea, TextField } from "@radix-ui/themes"
const NewIssuesPage = () => {
    return (
        <div className={styles.textDiv}>
            <TextField.Root placeholder="New Issue" className={styles.spaceBetween}></TextField.Root>
            <TextArea placeholder="Description..." resize="vertical" className={styles.spaceBetween}></TextArea>
            <Button >Submit New Issues</Button>
        </div>
    )
}
export default NewIssuesPage