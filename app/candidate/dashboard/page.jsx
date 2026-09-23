"use client";
import {
    Bookmark,
    Briefcase,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function CandidateDashboard() {

    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getApplicationDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                setApplication([]);
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/application/get`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;
            if (data.success === true) {
                setApplication(data.applications || []);
            } else {
                setApplication([]);
            }
        } catch (error) {
            console.error("Get applications List Error:", error.response?.data || error.message);
            setApplication([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApplicationDetails();
    }, []);

    // total count 
    const totalapplication = application?.length || 0;
    const totalUnderReview = application?.filter(item => item.status === "pending").length || 0;
    const totalShortlisted = application?.filter(item => item.status === "success").length || 0;
    const totalSavedJobs = application?.filter(item => item.status === "saved").length || 0;

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold">Welcome Back {user?.email || ""} 👋</h1>
                <p className="mt-1 text-sm text-gray-500">Here's what's happening with your job search.</p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={<Briefcase />} title="Applied Jobs" value={totalapplication} />
                <StatCard icon={<Clock />} title="Under Review" value={totalUnderReview} />
                <StatCard icon={<CheckCircle />} title="Shortlisted" value={totalShortlisted} />
                <StatCard icon={<Bookmark />} title="Saved Jobs" value={totalSavedJobs} />
            </div>

            <div className="mt-8 rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 p-5">
                    <h2 className="font-bold">Recent Applications</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <p className="px-5 py-10 text-center text-sm text-gray-500"> Loading applications...</p>
                    )
                        : application.length > 0 ? (
                            application.map((item) => (
                                <div key={item._id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between" >
                                    <div>
                                        <h3 className="font-semibold"> {item.job?.title || "N/A"}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{item.job?.company?.name ||
                                            item.company?.name ||
                                            "N/A"}</p>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <span className="text-xs text-gray-500">  {item.createdAt
                                            ? new Date(
                                                item.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )
                                            : "N/A"}</span>
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">{item.status || "Pending"}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="px-5 py-10 text-center text-sm text-gray-500">  No applications found.</p>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value }) {
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