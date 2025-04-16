import { IssueStatusBadge, Link } from "@/app/components"
import prisma from "@/prisma/client"
import { Table } from "@radix-ui/themes"
import NewIssueButton from "./NewIssueButton"
import styles from "./newIssuseStyles.module.css"

const IssuesPage = async () => {
    const issues = await prisma.issues.findMany()

    return (
        <div>
            <NewIssueButton />
            <Table.Root variant="surface" >
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