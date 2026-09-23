"use client";

import { useEffect, useState } from "react";
import JobCard from "../../../components/JobCard";
import axios from "axios";

export default function SavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSavedJobsDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                setSavedJobs([]);
                return;
            }

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/getSavedJobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = res.data;
            if (data.success === true) {
                setSavedJobs(data.savedJobs || []);
            } else {
                setSavedJobs([]);
            }
        } catch (error) {
            console.error("Get savedJobs List Error:", error.response?.data || error.message
            );
            setSavedJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSavedJobsDetails();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Saved Jobs</h1>
            <p className="mt-1 text-sm text-gray-500">Jobs you saved for later.</p>
            {loading && (
                <div className="mt-7 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                    Loading saved jobs...
                </div>
            )}

            {!loading && savedJobs.length === 0 && (
                <div className="mt-7 rounded-xl border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">No saved jobs</h2>
                    <p className="mt-2 text-sm text-gray-500">Jobs you save will appear here.</p>
                </div>
            )}

            {!loading && savedJobs.length > 0 && (
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                    {savedJobs.map((savedJob) => {
                        const job = savedJob.job;
                        if (!job) return null;
                        return (
                            <JobCard key={savedJob._id} job={job} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}