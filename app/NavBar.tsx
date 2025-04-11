'use client'

import Link from "next/link"
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
    const lists = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    const pathname = usePathname()

    return (
        <nav className="flex flex-row gap-10 border border-zinc-200 px-10 py-4 mb-4 items-center ">
            <Link href="/" ><AiFillBug /></Link>
            <div className="flex gap-5">
                {lists.map(list =>
                    <Link
                        key={list.href}
                        href={list.href}
                        className={classNames({
                            "text-zinc-500": pathname !== list.href,
                            "text-zinc-900": pathname === list.href,
                            "hover:text-zinc-800 transition-colors": true
                        })}
                    >{list.label}</Link>)}
            </div>
        </nav >
    )
}
export default NavBar