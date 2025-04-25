"use client"
import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"

interface Props {
    currentPage: number,
    pageSize: number,
    itemCount: number,
}

const Pagination = ({ currentPage, pageSize, itemCount }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)
    const router = useRouter()
    const searchParams = useSearchParams()

    const onButtonClick = (page: number) => {
        page = Math.max(1, Math.min(page, pageCount))

        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        router.push(`?${params.toString()}`)
    }

    if (pageCount <= 1) {
        return null
    }

    return (
        <Flex align={"center"} gap={"2"} >
            <Text>{currentPage} of {pageCount}</Text>
            <Button variant="soft" color="gray" disabled={currentPage === 1} onClick={() => onButtonClick(1)}>
                <MdKeyboardDoubleArrowLeft />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === 1} onClick={() => onButtonClick(currentPage - 1)}>
                <MdKeyboardArrowLeft />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === pageCount} onClick={() => onButtonClick(currentPage + 1)}>
                <MdKeyboardArrowRight />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === pageCount} onClick={() => onButtonClick(pageCount)}>
                <MdKeyboardDoubleArrowRight />
            </Button>
        </Flex >
    )
}
export default Pagination