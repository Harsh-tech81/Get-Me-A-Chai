"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-xl shadow-white text-white px-4 py-3 md:py-0">
      <div className="flex items-center justify-between gap-3 md:h-16">
        <Link
          className="logo font-bold text-lg flex items-center gap-2"
          href="/"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img className="invertImg" src="/tea.gif" width={44} alt="" />
          <span className="text-lg md:text-base">Get Me a Chai!</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="relative hidden items-center gap-4 md:flex">
          {session && (
            <>
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowdropdown(false);
                  }, 300);
                }}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {session.user.name}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => signOut({ callbackUrl: "/" })}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          {session && (
            <button
              className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              Logout
            </button>
          )}
          {!session && (
            <Link href="/login">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <div
        className={`mt-3 flex flex-col gap-2 rounded-xl bg-white/5 p-3 md:hidden ${mobileMenuOpen ? "" : "hidden"}`}
      >
        {session ? (
          <>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href={`/${session.user.name}`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Your Page
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
            <button className="w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
