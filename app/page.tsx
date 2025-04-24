import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'

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
    <IssueSummary open={open} inProgress={inProgress} closed={closed} />
  )
}
