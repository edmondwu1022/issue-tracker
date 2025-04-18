'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "./components";

const NavBar = () => {
    return (
        <nav className="border border-zinc-200 px-10 py-4 mb-4">
            <Container size={{ initial: "1", sm: "2", md: "3" }} >
                <Flex justify={"between"}>
                    <NavLink />
                    <AuthStatus />
                </Flex>
            </Container>
        </nav >
    )
}

const NavLink = () => {
    const lists = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]
    const pathname = usePathname()
    return (
        <Flex align={"center"} gap={"5"}>
            <Link href="/" ><AiFillBug /></Link>
            <ul className="flex gap-5">
                {lists.map(list =>
                    <li key={list.href}>
                        <Link
                            href={list.href}
                            className={classNames({
                                "nav-link": true,
                                "!text-zinc-900": pathname === list.href,
                            })}
                        >{list.label}</Link>
                    </li>
                )}
            </ul>
        </Flex >
    )
}

const AuthStatus = () => {
    const { status, data } = useSession()

    if (status === "loading") return <Skeleton width="1.7rem" height="1.7rem" circle />

    if (status === "unauthenticated")
        return <Link href={"/api/auth/signin"} className="nav-link">Log in</Link>
    return (
        <Box>
            <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <Avatar
                        src={data!.user!.image!}
                        fallback="?"
                        size={"2"}
                        radius="full"
                        className="cursor-pointer hover:opacity-80"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item>
                        <Text size={"3"}>{data!.user!.email}</Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="mt-2" color="red">
                        <Link href={"/api/auth/signout"}>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar