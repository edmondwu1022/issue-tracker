"use client"
import { Skeleton } from "@/app/components"
import { Issues, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const AssigneeSelect = ({ issue }: { issue: Issues }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then((res) => res.data),
        staleTime: 1000 * 60,
        retry: 3
    })

    const onChange = (userId: string | null) => {
        if (userId === " ")
            userId = null
        axios.patch(`/api/issues/${issue.id}`, { assigneeToUserId: userId || null })
            .catch(err => { console.log(err) })
    }

    if (isLoading) return <Skeleton />

    if (error) return null

    return (
        <Select.Root onValueChange={onChange} defaultValue={issue.assigneeToUserId || " "}>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content >
                <Select.Item value={" "}>Unassigned</Select.Item>
                {users?.map((user) => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))
                }
            </Select.Content>
        </Select.Root>
    )
}
export default AssigneeSelect