"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { saveJob, removeSavedJob, } from "../services/savedJobService.js";

export default function SaveJobButton({
    jobId,
    saved = false,
    onChange,
}) {
    const [isSaved, setIsSaved] = useState(saved);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsSaved(saved);
    }, [saved]);

    const handleSaveJob = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("Please login to save jobs.");
            return;
        }

        if (!jobId || loading) {
            return;
        }

        try {
            setLoading(true);
            if (isSaved) {
                await removeSavedJob(jobId);
                setIsSaved(false);
                if (onChange) {
                    onChange(jobId, false);
                }
            } else {
                await saveJob(jobId);
                setIsSaved(true);
                if (onChange) {
                    onChange(jobId, true);
                }
            }
        } catch (error) {
            console.error("Save Job Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSaveJob}
            disabled={loading}
            title={
                isSaved
                    ? "Remove saved job"
                    : "Save job"
            }
            className={`flex items-center gap-2 text-sm font-medium transition ${isSaved
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
                } ${loading
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
        >
            <Heart
                size={22}
                fill={
                    isSaved
                        ? "currentColor"
                        : "none"
                }
            />

            <span>
                {isSaved
                    ? "Saved"
                    : "Save Job"}
            </span>
        </button>
    );
}