import NextLink from 'next/link'
import { Link as RadiuxLink } from '@radix-ui/themes'

interface Props {
    href: string
    children: React.ReactNode
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadiuxLink weight={'medium'}>{children}</RadiuxLink>
        </NextLink>
    )
}
export default Link