import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'

interface Props {
  searchParams: Promise<{
    page: string
  }>
}

export default async function Home() {
  return (
    <LatestIssues />
  )
}
