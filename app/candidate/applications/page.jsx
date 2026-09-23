"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationsPage() {
    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h1 className="text-2xl font-bold">
                My Applications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
                Track all your job applications.
            </p>

            <div className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-5 py-4 text-sm font-semibold">
                                    Job
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Location
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Applied
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                    >
                                        Loading applications...
                                    </td>
                                </tr>
                            ) : application.length > 0 ? (
                                application.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-5 py-5">
                                            <p className="font-semibold">
                                                {item.job?.title || "N/A"}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.job?.company?.name ||
                                                    item.company?.name ||
                                                    "N/A"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-5 text-sm text-gray-600">
                                            {item.job?.location ||
                                                item.location ||
                                                "N/A"}
                                        </td>

                                        <td className="px-5 py-5 text-sm text-gray-600">
                                            {item.createdAt
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
                                                : "N/A"}
                                        </td>

                                        <td className="px-5 py-5">
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                {item.status || "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-5 py-10 text-center text-sm text-gray-500"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}