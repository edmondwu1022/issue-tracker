"use client"
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/app/components"


const AssigneeSelect = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/xapi/users').then((res) => res.data),
        staleTime: 1000 * 60,
        retry: 3
    })

    if (isLoading) return <Skeleton />

    if (error) return null

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content >
                {users?.map((user) => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))
                }
            </Select.Content>
        </Select.Root>
    )
}
export default AssigneeSelect