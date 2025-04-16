import { Skeleton } from "@/app/components"
import { Box, Card } from "@radix-ui/themes"

const LoadingIssuesDetailPage = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Skeleton count={1}></Skeleton>
            <Card className="prose" mt={"4"}>
                <Skeleton count={5} ></Skeleton>
            </Card>
        </Box>
    )
}
export default LoadingIssuesDetailPage