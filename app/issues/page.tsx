import prisma from "@/prisma/client"
import { Table } from "@radix-ui/themes"
import styles from "./newIssuseStyles.module.css"
import IssueStatusBadge from "../component/IssueStatusBadge"
import delay from "delay"
import NewIssueButton from "./NewIssueButton"
import Link from "next/link"

const IssuesPage = async () => {
    const issues = await prisma.issues.findMany()
    await delay(2000) // Simulate a delay for loading state

    return (
        <div>
            <NewIssueButton />
            <Table.Root variant="surface" className="bg-yellow-200">
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
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className={styles.mdInfoDisplay}><IssueStatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}><IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className={styles.tableCellDisplay}>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root >
        </div >

    )
}
export default IssuesPage