import Link from "next/link"
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const lists = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Issues", href: "/issues" }
    ]
    return (
        <nav className="flex flex-row gap-10 border border-zinc-200 px-10 py-4 mb-4 items-center ">
            <Link href="/" ><AiFillBug /></Link>
            <div className="flex gap-5">
                {lists.map(list =>
                    <Link
                        key={list.href}
                        href={list.href}
                        className="text-zinc-500 hover:text-zinc-900 transition-colors"
                    >{list.label}</Link>)}
            </div>
        </nav>
    )
}
export default NavBar