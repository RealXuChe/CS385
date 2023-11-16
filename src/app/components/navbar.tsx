import Link from "next/link";

export default function Navbar() {
    return (
        <header
            className="sticky top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-opacity-50 dark:from-blue-800 dark:to-purple-800">
            <h1 className="text-white font-bold text-xl">
                Cepheus Toolkit
            </h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link className="text-white hover:text-blue-200 dark:hover:text-blue-400" href="/">
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
