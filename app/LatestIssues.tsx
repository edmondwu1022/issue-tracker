import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import { IssueStatusBadge } from "./components"
import Link from "next/link"


const LatestIssues = async () => {
    const isssues = await prisma.issues.findMany(
        {
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                assigneeToUser: {
                    select: { image: true }
                }
            }
        }
    )


    return (
        <Card>
            <Heading>Latest</Heading>
            <Table.Root>
                <Table.Body>
                    {isssues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify={"between"} align="center">
                                    <Flex direction="column" gap="2" align="start">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assigneeToUserId &&
                                        <Avatar src={issue.assigneeToUser!.image!} fallback="?" size={"2"} radius="full" />
                                    }
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </Card >
    )
}

export default LatestIssues