
import axios from "axios";

const getToken = () => {
    if (typeof window === "undefined") {
        return null;
    }
    return localStorage.getItem("token");
};

const authConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get logged-in user's saved jobs
export const getSavedJobs = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/getSavedJobs`,
        authConfig());
    return response.data;
};

// Save job
export const saveJob = async (jobId) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/save`,
        {
            jobId,
        },
        authConfig()
    );
    return response.data;
};

// Remove saved job
export const removeSavedJob = async (jobId) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/remove/${jobId}`,
        authConfig()
    );
    return response.data;
};

// Check individual job
export const checkSavedJob = async (jobId) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/check/${jobId}`,
        authConfig()
    );
    return response.data;
};