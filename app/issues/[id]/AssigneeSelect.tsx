"use client"
import { Select } from "@radix-ui/themes"

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content >
                <Select.Item value="1">Assignee 1</Select.Item>
                <Select.Item value="2">Assignee 2</Select.Item>
                <Select.Item value="3">Assignee 3</Select.Item>
            </Select.Content>
        </Select.Root>
    )
}
export default AssigneeSelect