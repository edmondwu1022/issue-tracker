import { IssueStatusBadge, Link } from "@/app/components"
import prisma from "@/prisma/client"
import { Flex, Table } from "@radix-ui/themes"
import NewIssueButton from "./NewIssueButton"
import styles from "../Issue.module.css"
import IssueStatusFilter from "./IssueStatusFilter"
import { Status, Issues } from "@prisma/client"
import NextLink from "next/link"
import { GoArrowDown } from "react-icons/go";



export const dynamic = "force-dynamic"

interface Props {
    searchParams: Promise<{
        status: Status,
        orderBy: keyof Issues
    }>
}

const columns: { label: string, value: keyof Issues, classname?: string }[] = [
    { label: "Issues", value: "title" },
    { label: "Status", value: "status", classname: styles.tableCellDisplay },
    { label: "CreateAt", value: "createdAt", classname: styles.tableCellDisplay }
]

const IssuesPage = async ({ searchParams }: Props) => {
    const search = await searchParams
    const statues = Object.values(Status)
    const status = statues.includes(search.status) ? search.status : undefined

    const issues = await prisma.issues.findMany({
        where: { status }
    })
    return (
        <div>
            <Flex justify={"between"}>
                <IssueStatusFilter />
                <NewIssueButton />
            </Flex>
            <Table.Root variant="surface" >
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) =>
                            <Table.ColumnHeaderCell key={column.value} className={column.classname}>
                                <NextLink href={{
                                    query: {
                                        ...search,
                                        orderBy: column.value,
                                    }
                                }}>{column.label}</NextLink>
                                {search.orderBy === column.value && (
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
        </div >

    )
}
export default IssuesPage