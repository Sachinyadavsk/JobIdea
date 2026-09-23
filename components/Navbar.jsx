"use client";

import Link from "next/link";
import { Briefcase, Menu, X, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    const closeMenu = () => {
        setOpen(false);
    };

    // Get logged-in user
    const getUser = () => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Get User Error:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        getUser();
        // Update navbar when login/logout happens
        const handleAuthChange = () => {
            getUser();
        };
        window.addEventListener("authChanged", handleAuthChange);
        window.addEventListener("storage", handleAuthChange);
        return () => {
            window.removeEventListener("authChanged", handleAuthChange);
            window.removeEventListener("storage", handleAuthChange);
        };
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        closeMenu();
        window.dispatchEvent(new Event("authChanged"));
        router.push("/login");
    };

    // Dashboard based on role
    const dashboardLink = user?.role === "recruiter" ? "/employer/dashboard" : "/candidate/dashboard";
    const dashboardText = user?.role === "recruiter" ? "Dashboard" : "Dashboard";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2 text-xl font-bold text-blue-600">
                    <Briefcase size={25} />
                    JobIdea
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="text-sm font-medium text-gray-700 transition hover:text-blue-600"> Home</Link>
                    <Link href="/jobs" className="text-sm font-medium text-gray-700 transition hover:text-blue-600">Jobs</Link>
                    <Link href="/companies" className="text-sm font-medium text-gray-700 transition hover:text-blue-600"> Companies</Link>
                    {!user ? (
                        <>
                            {/* Login */}
                            <Link href="/login" className="text-sm font-medium text-gray-700 transition hover:text-blue-600"> Login</Link>
                            {/* Register */}
                            <Link href="/register"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Dashboard */}
                            <Link href={dashboardLink} className="text-sm font-medium text-gray-700 transition hover:text-blue-600">
                                {dashboardText}
                            </Link>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
                            >
                                <LogOut size={17} />
                                Logout
                            </button>
                        </>
                    )}
                </nav>

                {/* Mobile Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                >
                    {open ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {open && (
                <nav className="border-t border-gray-200 bg-white px-4 py-5 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link href="/" onClick={closeMenu} className="font-medium text-gray-700 hover:text-blue-600"> Home</Link>
                        <Link href="/jobs" onClick={closeMenu} className="font-medium text-gray-700 hover:text-blue-600"> Jobs</Link>
                        <Link href="/companies" onClick={closeMenu} className="font-medium text-gray-700 hover:text-blue-600">Companies</Link>
                        {!user ? (
                            <>
                                {/* Login */}
                                <Link href="/login" onClick={closeMenu} className="font-medium text-gray-700 hover:text-blue-600">Login</Link>
                                {/* Register */}
                                <Link href="/register" onClick={closeMenu}
                                    className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Dashboard */}
                                <Link href={dashboardLink} onClick={closeMenu} className="font-medium text-gray-700 hover:text-blue-600">
                                    {dashboardText}
                                </Link>

                                {/* Logout */}
                                <button type="button" onClick={handleLogout}
                                    className="flex w-fit items-center gap-2 font-medium text-red-600 hover:text-red-700"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Navbar;