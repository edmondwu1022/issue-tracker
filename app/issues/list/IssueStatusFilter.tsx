"use client"

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED }
]

const IssueStatusFilter = () => {
    const router = useRouter()

    const onChange = (value: string) => {
        const query = value ? `?status=${value}` : ""
        router.push(`/issues/list` + query)
    }
    return (
        <Select.Root onValueChange={onChange}>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content >
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || " "}>
                        {status.label}
                    </Select.Item>))}
            </Select.Content>
        </Select.Root>
    )
}
export default IssueStatusFilter