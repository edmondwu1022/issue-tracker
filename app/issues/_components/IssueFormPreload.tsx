"use client"
import dynamic from "next/dynamic"
import IssueFormLoading from "./IssueFormLoading"
import { Issues } from "@prisma/client"

const IssueForm = dynamic(
    () => import("@/app/issues/_components/IssueForm"),
    {
        ssr: false,
        loading: () => <IssueFormLoading />
    }
)

const IssueFormPreload = ({ issue }: { issue?: Issues }) => {
    return (
        <IssueForm issue={issue} />
    )
}
export default IssueFormPreload