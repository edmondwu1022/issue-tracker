import prisma from "@/prisma/client"
import { Button, Table } from "@radix-ui/themes"
import Link from "next/link"
import styles from "./newIssuseStyles.module.css"

const IssuesPage = async () => {
    const issues = await prisma.issues.findMany()
    console.log(issues)
    return (
        <div>
            <div className="mb-4">
                <Button><Link href="/issues/new">New</Link></Button>
            </div>

            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.tableCellDisplay}>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.tableCellDisplay}>CreateAt</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell >
                                {issue.title}
                                <p className={styles.mdInfoDisplay}>{issue.status}</p>
                            </Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}>{issue.status}</Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>

    )
}
export default IssuesPage