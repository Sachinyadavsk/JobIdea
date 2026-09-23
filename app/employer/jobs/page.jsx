"use client";

import { useState } from "react";

const initialJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        applicants: 124,
        status: "Active",
    },
    {
        id: 2,
        title: "Backend Developer",
        applicants: 86,
        status: "Active",
    },
    {
        id: 3,
        title: "UI/UX Designer",
        applicants: 52,
        status: "Closed",
    },
];

export default function EmployerJobsPage() {
    const [jobs, setJobs] = useState(initialJobs);

    const deleteJob = (id) => {
        setJobs((prev) =>
            prev.filter((job) => job.id !== id)
        );
    };

    return (
        <div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold">
                        Manage Jobs
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your posted job listings.
                    </p>
                </div>

                <a
                    href="/employer/post-job"
                    className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                    + Post New Job
                </a>

            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px] text-left">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-5 py-4 text-sm">
                                    Job
                                </th>

                                <th className="px-5 py-4 text-sm">
                                    Applicants
                                </th>

                                <th className="px-5 py-4 text-sm">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-sm">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">

                            {jobs.map((job) => (
                                <tr key={job.id}>

                                    <td className="px-5 py-5 font-semibold">
                                        {job.title}
                                    </td>

                                    <td className="px-5 py-5 text-sm text-gray-600">
                                        {job.applicants}
                                    </td>

                                    <td className="px-5 py-5">
                                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                                            {job.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-5">

                                        <button
                                            onClick={() => deleteJob(job.id)}
                                            className="text-sm font-medium text-red-500 hover:text-red-600"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}