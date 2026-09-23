"use client";

import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const CompanyCard = ({ company }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get company jobs
    const getCompanyJobstotal = async (companyId) => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/companybyid/joblist/get/${companyId}`);
            const data = res.data;
            if (data.success === true) {
                const companyJobs = data.jobs || [];
                setJobs(companyJobs);
            } else {
                setJobs([]);
                console.error(data.message || "Company jobs not found.");
            }
        } catch (error) {
            console.error("Get Company Jobs Error:", error.response?.data || error.message);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (company?._id) {
            getCompanyJobstotal(company._id);
        }
    }, [company?._id]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            {/* Company */}
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                    {company?.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
                <div>
                    <h3 className="font-bold">{company?.name || "Company"}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />{company?.location || "Location not specified"}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Building2 size={16} />
                    {loading ? ("Loading...") : (`${jobs.length} Open Jobs`)}
                </span>

                <Link href={`/companies/${company?._id}`} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default CompanyCard;