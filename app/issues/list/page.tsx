import prisma from "@/prisma/client"
import { Flex } from "@radix-ui/themes"
import NewIssueButton from "./NewIssueButton"
import { Status } from "@prisma/client"
import IssueStatusFilter from "./IssueStatusFilter"
import Pagination from "@/app/components/Pagination"
import IssuesTable, { columnNames, IssuesTableProps } from "./IssuesTable"

export const dynamic = "force-dynamic"

interface Props {
    searchParams: Promise<IssuesTableProps>
}

const IssuesPage = async ({ searchParams }: Props) => {
    const search = await searchParams
    const statues = Object.values(Status)
    const status = statues.includes(search.status) ? search.status : undefined

    // #region pagination parameters
    const page = parseInt(search.page) || 1
    const pageSize = 10
    //#endregion

    // #region Prisma options
    const where = { status }
    // map回傳 Array
    const orderBy = columnNames.includes(search.orderBy) ? {
        [search.orderBy]: "asc"
    } : undefined
    const skip = (page - 1) * pageSize
    const take = pageSize
    //#endregion

    const issues = await prisma.issues.findMany({ where, orderBy, skip, take })
    // pageCount
    const counts = await prisma.issues.count({ where })

    return (
        <Flex direction={"column"} gap={"3"}>
            <Flex justify={"between"}>
                <IssueStatusFilter />
                <NewIssueButton />
            </Flex>
            <IssuesTable searchParams={search} issues={issues} />
            <Pagination currentPage={page} itemCount={counts} pageSize={pageSize} />
        </Flex>
    )
}
export default IssuesPage