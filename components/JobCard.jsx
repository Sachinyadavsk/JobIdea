import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";

export default function JobCard({ job }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            {/* Top */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
                    {job.company?.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
                <button type="button" title="Remove saved job" className="flex items-center gap-2 text-sm font-medium transition text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart" aria-hidden="true">
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>
                    <span>Saved</span>
                </button>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold">{job.title}</h3>
            {/* Company */}
            <p className="mt-1 text-sm text-gray-500">{job.company?.name || "Company"}</p>
            {/* Details */}
            <div className="mt-5 space-y-2">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} />{job.location || "Location not specified"}
                </div>
                {/* Job Type */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase size={15} />{job.jobType || "Full Time"}
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                <span className="text-sm font-bold">₹{job.salary || 0} LPA</span>
                <Link href={`/jobs/${job._id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View Job
                </Link>
            </div>
        </div>
    );
}