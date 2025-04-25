import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: Promise<{
    page: string
  }>
}

export default async function Home() {
  const open = await prisma.issues.count({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" }
  })
  const inProgress = await prisma.issues.count({
    where: { status: "IN_PROGRESS" },
    orderBy: { createdAt: "desc" }
  })
  const closed = await prisma.issues.count({
    where: { status: "CLOSED" },
    orderBy: { createdAt: "desc" }
  })
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"2"} >
      <Flex direction={"column"} gap={"2"} justify={"between"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Issue Tracker - Dashboard",
}