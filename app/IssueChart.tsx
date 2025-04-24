"use client"

import { Card } from "@radix-ui/themes"
import { XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts"

interface Props {
    open: number,
    closed: number,
    inProgress: number
}


const IssueChart = ({ open, closed, inProgress }: Props) => {
    const data: { label: string, value: number }[] = [
        { label: "Open", value: open },
        { label: "In Progress", value: inProgress },
        { label: "Closed", value: closed }
    ]
    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} >
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey="value" fill="#8880d8" barSize="10%" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
export default IssueChart