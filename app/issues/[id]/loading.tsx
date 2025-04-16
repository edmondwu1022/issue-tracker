import { Box, Card } from "@radix-ui/themes"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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