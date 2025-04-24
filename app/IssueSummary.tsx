import { Flex, Card, Text } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import Link from "next/link"

interface Props {
    open: number,
    closed: number,
    inProgress: number,
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
    const containers: { label: string, value: number, statues: Status }[] = [
        { label: 'Open', value: open, statues: "OPEN" },
        { label: 'In Progress', value: inProgress, statues: "IN_PROGRESS" },
        { label: 'Closed', value: closed, statues: "CLOSED" }
    ]

    return (
        <Flex gap={"2"} align={"center"}>
            {containers.map(container =>
                <Card key={container.label} className="w-[8rem]">
                    <Link href={`/issues/list?status=${container.statues}`}>
                        <Text className="block text-center font-black">{container.label}</Text>
                        <Text className="block text-center">{container.value}</Text>
                    </Link>
                </Card>
            )}
        </Flex>
    )
}
export default IssueSummary