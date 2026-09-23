const applicants = [
    {
        name: "Rahul Sharma",
        job: "Frontend Developer",
        experience: "2 Years",
        status: "New",
    },
    {
        name: "Priya Singh",
        job: "Frontend Developer",
        experience: "3 Years",
        status: "Shortlisted",
    },
    {
        name: "Amit Kumar",
        job: "Backend Developer",
        experience: "4 Years",
        status: "Interview",
    },
    {
        name: "Neha Verma",
        job: "UI/UX Designer",
        experience: "2 Years",
        status: "New",
    },
];

export default function ApplicantsPage() {
    return (
        <div>

            <h1 className="text-2xl font-bold">
                Applicants
            </h1>

            <p className="mt-1 text-sm text-gray-500">
                Review and manage candidates.
            </p>

            <div className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[750px] text-left">

                        <thead className="bg-gray-50">

                            <tr>
                                <th className="px-5 py-4 text-sm">
                                    Candidate
                                </th>

                                <th className="px-5 py-4 text-sm">
                                    Applied For
                                </th>

                                <th className="px-5 py-4 text-sm">
                                    Experience
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

                            {applicants.map((applicant) => (
                                <tr key={applicant.name}>

                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                                {applicant.name.charAt(0)}
                                            </div>

                                            <span className="font-semibold">
                                                {applicant.name}
                                            </span>

                                        </div>
                                    </td>

                                    <td className="px-5 py-5 text-sm text-gray-600">
                                        {applicant.job}
                                    </td>

                                    <td className="px-5 py-5 text-sm text-gray-600">
                                        {applicant.experience}
                                    </td>

                                    <td className="px-5 py-5">
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                            {applicant.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-5">
                                        <button className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium hover:bg-gray-50">
                                            View
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