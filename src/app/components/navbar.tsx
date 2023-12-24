"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const jump = (to: string) => {
  window.location.href = to;
};

export default function Navbar() {
  const router = useRouter();
  const name =
    typeof window !== "undefined"
      ? window.localStorage.getItem("username")
      : null;
  return (
    <header
      className="sticky top-0 left-0 right-0 h-16 flex items-center justify-between px-6
              bg-gradient-to-r from-purple-500/[0.95] to-indigo-500/[0.95]  z-40 backdrop-blur-md"
    >
      <h1 className="text-white font-bold text-xl select-none">
        <Link
          className="text-white hover:text-blue-200 dark:hover:text-blue-400 cursor-pointer select-none text-2xl"
          href="/"
          onClick={() => jump("/")}
        >
          Cepheus Toolkit
        </Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          {(() => {
            if (name === null) {
              return (
                <li>
                  <Link
                    className="text-white hover:text-blue-200 dark:hover:text-blue-400 cursor-pointer select-none text-2xl"
                    href="/Signin"
                    onClick={() => jump("/Signin")}
                  >
                    Sign In
                  </Link>
                </li>
              );
            } else {
              return (
                <>
                  <li>
                    <div className="text-white cursor-pointer select-none text-2xl">
                      {localStorage.getItem("username")}
                    </div>
                  </li>
                  <li>
                    <div
                      className="text-white cursor-pointer select-none text-2xl"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("avatar");
                        router.refresh();
                      }}
                    >
                      Logout
                    </div>
                  </li>
                </>
              );
            }
          })()}
        </ul>
      </nav>
    </header>
  );
}
