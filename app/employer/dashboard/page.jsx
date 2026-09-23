"use client";
import {
    Briefcase,
    FileText,
    Users,
    CheckCircle,
} from "lucide-react";


export default function EmployerDashboard() {

    return (
        <div>
            <h1 className="text-2xl font-bold">Employer Dashboar</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your jobs and applicants.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <Stat icon={<Briefcase />} value="8" title="Active Jobs" />
                <Stat icon={<Users />} value="124" title="Total Applicants" />
                <Stat icon={<FileText />} value="32" title="New Applications" />
                <Stat icon={<CheckCircle />} value="16" title="Interviews" />
            </div>

            <div className="mt-8 rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 p-5">
                    <h2 className="font-bold">Recent Jobs</h2>
                </div>

                {[
                    ["Frontend Developer", "124 Applicants"],
                    ["Backend Developer", "86 Applicants"],
                    ["UI/UX Designer", "52 Applicants"],
                ].map(([job, applicants]) => (
                    <div key={job} className="flex items-center justify-between border-b border-gray-200 p-5 last:border-0">
                        <div>
                            <h3 className="font-semibold"> {job}</h3>
                            <p className="mt-1 text-sm text-gray-500">{applicants}</p>
                        </div>
                        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                            Manage
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Stat({ icon, value, title }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">{icon}</div>
                <span className="text-2xl font-bold">{value}</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">{title}</p>
        </div>
    );
}