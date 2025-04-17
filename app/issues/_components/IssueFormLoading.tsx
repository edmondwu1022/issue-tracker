import { Box, Card } from "@radix-ui/themes"
import Skeleton from "@/app/components/Skeleton"

const IssueFormLoading = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton height={"2rem"} className='mb-5'></Skeleton>
            <Card>
                <Skeleton height={"15rem"}></Skeleton>
            </Card>
        </Box>
    )
}
export default IssueFormLoading 