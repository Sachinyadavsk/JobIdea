"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const addJob = (job) => {
        setJobs((prev) => [job, ...prev]);
    };

    const updateJob = (id, updatedJob) => {
        setJobs((prev) =>
            prev.map((job) =>
                job.id === id
                    ? { ...job, ...updatedJob }
                    : job
            )
        );
    };

    const deleteJob = (id) => {
        setJobs((prev) =>
            prev.filter((job) => job.id !== id)
        );
    };

    return (
        <JobContext.Provider
            value={{
                jobs,
                loading,
                addJob,
                updateJob,
                deleteJob,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);

    if (!context) {
        throw new Error(
            "useJobs must be used inside JobProvider"
        );
    }

    return context;
};