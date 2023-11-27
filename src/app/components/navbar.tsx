import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gradient-to-r from-blue-500/[0.6]
             to-purple-500/[0.95] dark:from-blue-800/[0.6] dark:to-purple-800/[0.95] z-40 backdrop-blur-md"
    >
      <h1 className="text-white font-bold text-xl select-none">
        Cepheus Toolkit
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              className="text-white hover:text-blue-200 dark:hover:text-blue-400 cursor-pointer select-none"
              href="/"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
