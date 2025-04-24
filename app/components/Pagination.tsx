import { Button, Flex, Text } from "@radix-ui/themes"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"

interface Props {
    currentPage: number,
    pageSize: number,
    itemCount: number,
}

const Pagination = ({ currentPage, pageSize, itemCount }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)

    if (pageCount <= 1) {
        return null
    }

    return (
        <Flex align={"center"} gap={"2"} >
            <Text>{currentPage} of {pageCount}</Text>
            <Button variant="soft" color="gray" disabled={currentPage === 1}>
                <MdKeyboardDoubleArrowLeft />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === 1}>
                <MdKeyboardArrowLeft />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
                <MdKeyboardArrowRight />
            </Button>
            <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
                <MdKeyboardDoubleArrowRight />
            </Button>
        </Flex >
    )
}
export default Pagination