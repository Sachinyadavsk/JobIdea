"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Upload, FileText, Trash2 } from "lucide-react";

export default function ResumePage() {
    const [user, setUser] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // GET USER
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setError("User not found. Please login again.");
            setLoading(false);
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setResume(parsedUser?.profile?.resume
                ? {
                    url: parsedUser.profile.resume,
                    name: parsedUser?.profile?.resumeOriginalName || "My Resume.pdf"
                }
                : null
            );
        } catch (err) {
            console.error("User data error:", err);
            setError("Invalid user data. Please login again.");
        } finally {
            setLoading(false);
        }
    }, []);


    // UPLOAD RESUME
    const handleResumeChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        setMessage("");
        setError("");

        // PDF CONDITION
        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        if (file.type !== "application/pdf" || extension !== "pdf") {
            setError("Only PDF files are allowed.");
            e.target.value = "";
            return;
        }

        // 5MB CONDITION
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setError("Resume must be less than 5MB.");
            e.target.value = "";
            return;
        }

        // USER ID
        if (!user?._id) {
            setError("User ID not found. Please login again.");
            e.target.value = "";
            return;
        }

        try {
            setUploading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found. Please login again.");
                return;
            }

            const formData = new FormData();
            formData.append("resume", file);
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile/update/${user._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const updatedUser = response.data.user;
            if (updatedUser) {
                const updatedResume = {
                    url: updatedUser?.profile?.resume || "",
                    name: updatedUser?.profile?.resumeOriginalName || file.name
                };

                setResume(updatedResume);
                setUser(updatedUser);

                // Update localStorage
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            setMessage(response.data.message || "Resume uploaded successfully.");
        } catch (error) {
            console.error("Resume Upload Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to upload resume.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    // REMOVE RESUME
    const handleRemoveResume = async () => {
        if (!user?._id) {
            setError("User ID not found.");
            return;
        }

        try {
            setRemoving(true);
            setMessage("");
            setError("");
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found. Please login again.");
                return;
            }

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/resume/${user._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setResume(null);
            const updatedUser = response.data.user;
            if (updatedUser) {
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            setMessage(response.data.message || "Resume removed successfully.");
        } catch (error) {
            console.error("Remove Resume Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to remove resume.");
        } finally {
            setRemoving(false);
        }
    };

    // LOADING
    if (loading) {
        return (
            <div className="p-6">
                <p className="text-sm text-gray-500">
                    Loading resume...
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">My Resume</h1>
            <p className="mt-1 text-sm text-gray-500">Upload and manage your resume.</p>

            {/* MESSAGE */}
            {message && (
                <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                </div>
            )}

            {error && (
                <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6">
                {/* UPLOAD */}
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Upload size={25} />
                    </div>
                    <h3 className="mt-5 font-bold">Upload Your Resume</h3>
                    <p className="mt-2 text-sm text-gray-500"> PDF only, maximum 5MB</p>
                    <label
                        className={`mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white ${uploading
                            ? "cursor-not-allowed bg-gray-400"
                            : "cursor-pointer bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        <Upload size={17} />

                        {uploading
                            ? "Uploading..."
                            : "Choose PDF"}

                        <input
                            type="file"
                            className="hidden"
                            accept="application/pdf,.pdf"
                            onChange={handleResumeChange}
                            disabled={uploading}
                        />
                    </label>

                </div>



                {/* CURRENT RESUME */}

                {resume && (
                    <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 p-4">

                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-600" />

                            <div>
                                <p className="text-sm font-semibold">
                                    {resume.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Resume uploaded
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* DOWNLOAD */}

                            <a
                                href={resume.url}
                                download={resume.name || "resume.pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Download
                            </a>

                            {/* REMOVE */}

                            <button
                                type="button"
                                onClick={handleRemoveResume}
                                disabled={removing}
                                className="text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                            >
                                {removing
                                    ? "Removing..."
                                    : "Remove"}
                            </button>

                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}