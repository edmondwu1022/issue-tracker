import { IssueStatusBadge } from "@/app/components"
import { Issues } from "@prisma/client"
import { Heading, Card, Text } from "@radix-ui/themes"
import ReactMarkdown from "react-markdown"

const IssueDetail = ({ issue }: { issue: Issues }) => {
    return (
        <>
            <Heading className="">{issue.title}</Heading>
            <div className="my-2 flex gap-2">
                <IssueStatusBadge status={issue.status} />
                <Text as="p" size={"1"}>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card className="prose" mt={"4"}>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}
export default IssueDetail