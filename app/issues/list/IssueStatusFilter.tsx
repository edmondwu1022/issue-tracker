"use client"

import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED }
]

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams()

    const onChange = (value: string | null) => {
        if (value !== " ") {
            params.append("status", value!)
        }
        else { value = null }

        if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!)

        const query = params.size ? "?" + params.toString() : ""
        router.push(`/issues/list` + query)
    }
    return (
        <Select.Root onValueChange={onChange} defaultValue={searchParams.get("status") || " "}>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content >
                {statuses.map((status, index) => (
                    <Select.Item key={index} value={status.value || " "}>
                        {status.label}
                    </Select.Item>))}
            </Select.Content>
        </Select.Root>
    )
}
export default IssueStatusFilter