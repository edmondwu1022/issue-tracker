import Image from 'next/image'
import Pagination from './components/Pagination'

interface Props {
  searchParams: Promise<{
    page: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams
  const pageNumber = (page) ? parseInt(page) : 1

  return (
    <Pagination currentPage={pageNumber} pageSize={10} itemCount={100} />
  )
}
