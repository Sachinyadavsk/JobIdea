import Link from "next/link";
import {
    Briefcase,
    LayoutDashboard,
    PlusCircle,
    Users,
} from "lucide-react";

export default function EmployerLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">

                <aside className="hidden w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:block">

                    <h2 className="mb-6 text-lg font-bold">
                        Employer Panel
                    </h2>

                    <nav className="space-y-2">

                        <Link
                            href="/employer/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            href="/employer/post-job"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <PlusCircle size={18} />
                            Post Job
                        </Link>

                        <Link
                            href="/employer/jobs"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Briefcase size={18} />
                            Manage Jobs
                        </Link>

                        <Link
                            href="/employer/applicants"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Users size={18} />
                            Applicants
                        </Link>

                    </nav>

                </aside>

                <main className="min-w-0 flex-1">
                    {children}
                </main>

            </div>

        </div>
    );
}