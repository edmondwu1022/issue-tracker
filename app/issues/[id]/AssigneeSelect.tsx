"use client"
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { useEffect, useState } from "react"

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        const fetchUser = async () => {
            const user = await axios.get("/api/users")
            if (user.status === 200) {
                setUsers(user.data)
            }
        }
        fetchUser()
    }, [])

    console.log(users)
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content >
                {users.map((user) => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))
                }
            </Select.Content>
        </Select.Root>
    )
}
export default AssigneeSelect