import Link from "next/link";
import {
    Bookmark,
    FileText,
    LayoutDashboard,
    User,
} from "lucide-react";


const menu = [
    { href: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/candidate/profile", label: "My Profile", icon: User },
    { href: "/candidate/applications", label: "Applications", icon: FileText },
    { href: "/candidate/saved-jobs", label: "Saved Jobs", icon: Bookmark },
    { href: "/candidate/resume", label: "Resume", icon: FileText },
];

export default function CandidateLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:gap-6 lg:px-8 lg:py-8">

                {/* Desktop Sidebar */}
                <aside className="hidden w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:block">
                    <h2 className="mb-6 text-lg font-bold">Candidate Panel</h2>

                    <nav className="space-y-2">
                        {menu.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Mobile Navigation */}
                <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 lg:hidden">
                    <nav className="flex min-w-max gap-2">
                        {menu.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <Icon size={17} />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <main className="min-w-0 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}