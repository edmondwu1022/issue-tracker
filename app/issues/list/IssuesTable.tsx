import { Table } from "@radix-ui/themes"
import NextLink from "next/link"
import { GoArrowDown } from "react-icons/go";
import styles from "../Issue.module.css"
import { IssueStatusBadge, Link } from "@/app/components"
import { Issues, Status } from "@prisma/client";

interface Props {
    searchParams: IssuesTableProps,
    issues: Issues[]
}

const IssuesTable = ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant="surface" >
            <Table.Header>
                <Table.Row>
                    {columns.map((column) =>
                        <Table.ColumnHeaderCell key={column.value} className={column.classname}>
                            <NextLink href={{
                                query: {
                                    ...searchParams,
                                    orderBy: column.value,
                                }
                            }}>{column.label}</NextLink>
                            {searchParams.orderBy === column.value && (
                                <GoArrowDown className="inline ml-1" />
                            )}
                        </Table.ColumnHeaderCell>
                    )
                    }
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
    )
}

export interface IssuesTableProps {
    status: Status,
    orderBy: keyof Issues,
    page: string
}

const columns: { label: string, value: keyof Issues, classname?: string }[] = [
    { label: "Issues", value: "title" },
    { label: "Status", value: "status", classname: styles.tableCellDisplay },
    { label: "CreateAt", value: "createdAt", classname: styles.tableCellDisplay }
]

export const columnNames = columns.map(column => column.value)

export default IssuesTable