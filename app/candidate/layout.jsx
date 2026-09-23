import Link from "next/link";
import {
    Bookmark,
    FileText,
    LayoutDashboard,
    User,
} from "lucide-react";

export default function CandidateLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">

                {/* Sidebar */}
                <aside className="hidden w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:block">

                    <h2 className="mb-6 text-lg font-bold">
                        Candidate Panel
                    </h2>

                    <nav className="space-y-2">

                        <Link
                            href="/candidate/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            href="/candidate/profile"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <User size={18} />
                            My Profile
                        </Link>

                        <Link
                            href="/candidate/applications"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <FileText size={18} />
                            Applications
                        </Link>

                        <Link
                            href="/candidate/saved-jobs"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Bookmark size={18} />
                            Saved Jobs
                        </Link>

                        <Link
                            href="/candidate/resume"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <FileText size={18} />
                            Resume
                        </Link>

                    </nav>

                </aside>

                {/* Content */}
                <main className="min-w-0 flex-1">
                    {children}
                </main>

            </div>

        </div>
    );
}