'use client'

import Link from "next/link"
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
    const { status, data } = useSession()
    const lists = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]
    const pathname = usePathname()

    return (
        <nav className="border border-zinc-200 px-10 py-4 mb-4">
            <Container size={{ initial: "1", sm: "2", md: "3" }} >
                <Flex justify={"between"}>
                    <Flex align={"center"} gap={"5"}>
                        <Link href="/" ><AiFillBug /></Link>
                        <ul className="flex gap-5">
                            {lists.map(list =>
                                <li key={list.href}>
                                    <Link
                                        href={list.href}
                                        className={classNames({
                                            "text-zinc-500": pathname !== list.href,
                                            "text-zinc-900": pathname === list.href,
                                            "hover:text-zinc-800 transition-colors": true
                                        })}
                                    >{list.label}</Link>
                                </li>
                            )}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && <Link href={"/api/auth/signout"}>Log out</Link>}
                        {status === "unauthenticated" && <Link href={"/api/auth/signin"}>Log in</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav >
    )
}
export default NavBar