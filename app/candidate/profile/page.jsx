
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const SKILL_OPTIONS = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Tailwind CSS",
    "Bootstrap",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "PHP",
    "Laravel",
    "Python",
    "Java",
    "Git",
    "GitHub",
    "REST API",
    "Figma"
];

export default function CandidateProfile() {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        location: "",
        jobTitle: "",
        experience: "",
        bio: "",
        skills: []
    });

    const [profilePhoto, setProfilePhoto] = useState("");

    // GET LOGGED-IN USER
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
        } catch (error) {
            console.error("Invalid user data:", error);
            setError("Invalid user data. Please login again.");
            setLoading(false);
        }
    }, []);


    // GET USER DETAILS
    useEffect(() => {
        if (user?._id) {
            getUserDetails(user._id);
        }
    }, [user?._id]);

    const getUserDetails = async (userId) => {
        try {
            setLoading(true);
            setError("");
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found. Please login again.");
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getByIdUsers/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = response.data.user;
            if (!data) {
                setError("User details not found.");
                return;
            }

            setUserDetails(data);
            setFormData({
                fullname: data?.fullname || "",
                email: data?.email || "",
                phoneNumber: data?.phoneNumber || "",
                location: data?.location || "",
                jobTitle: data?.jobTitle || "",
                experience: data?.experience || "",
                bio: data?.profile?.bio || "",
                skills: Array.isArray(data?.profile?.skills)
                    ? data.profile.skills
                    : []
            });

            setProfilePhoto(data?.profile?.profilePhoto || "");
        } catch (error) {
            console.error("Get User Details Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // SKILL SELECT / REMOVE
    const handleSkillChange = (e) => {
        const value = e.target.value;
        if (!value) {
            return;
        }

        if (formData.skills.includes(value)) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            skills: [
                ...prev.skills,
                value
            ]
        }));

        // Reset dropdown
        e.target.value = "";
    };

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter(
                (skill) => skill !== skillToRemove
            )
        }));
    };

    // UPDATE PROFILE
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?._id) {
            setError("User ID not found.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");
            setError("");
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found. Please login again.");
                return;
            }

            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/update/${user._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const updatedUser = response.data.user;
            setMessage(response.data.message || "Profile updated successfully");
            if (updatedUser) {
                setUserDetails(updatedUser);
                setFormData({
                    fullname: updatedUser?.fullname || "",
                    email: updatedUser?.email || "",
                    phoneNumber: updatedUser?.phoneNumber || "",
                    location: updatedUser?.location || "",
                    jobTitle: updatedUser?.jobTitle || "",
                    experience: updatedUser?.experience || "",
                    bio: updatedUser?.profile?.bio || "",
                    skills: Array.isArray(updatedUser?.profile?.skills)
                        ? updatedUser.profile.skills
                        : []
                });

                setProfilePhoto(updatedUser?.profile?.profilePhoto || profilePhoto);
                updateLocalStorage(updatedUser);
            }

        } catch (error) {
            console.error("Update Profile Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };


    // UPDATE LOCAL STORAGE
    const updateLocalStorage = (updatedUser) => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            return;
        }

        try {
            const localUser = JSON.parse(storedUser);
            const updatedLocalUser = {
                ...localUser,
                ...updatedUser,
                _id: updatedUser._id
            };

            localStorage.setItem("user", JSON.stringify(updatedLocalUser));
            setUser(updatedLocalUser);

        } catch (error) {
            console.error("LocalStorage update error:", error);
        }
    };


    // PROFILE IMAGE
    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        if (!user?._id) {
            setError("User ID not found.");
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a JPG, PNG or WEBP image.");
            e.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setError("Profile image must be less than 5MB.");
            e.target.value = "";
            return;
        }

        try {
            setImageUploading(true);
            setMessage("");
            setError("");
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found. Please login again.");
                return;
            }

            const imageData = new FormData();
            imageData.append("profilePhoto", file);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/images/${user._id}`,
                imageData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const updatedUser = response.data.user;
            const newProfilePhoto = response.data.profilePhoto || updatedUser?.profile?.profilePhoto || "";
            setProfilePhoto(newProfilePhoto);
            if (updatedUser) {
                setUserDetails(updatedUser);
                updateLocalStorage(updatedUser);
            }
            setMessage(response.data.message || "Profile image updated successfully");

        } catch (error) {
            console.error("Profile Image Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to upload profile image");
        } finally {
            setImageUploading(false);
            e.target.value = "";
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your personal and professional information.</p>
            </div>

            {/* Success */}
            {message && (
                <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6">
                {/* PROFILE IMAGE */}
                <div className="mb-7 flex items-center gap-5">
                    <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                                {formData.fullname?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            className={`inline-block rounded-lg px-4 py-2 text-sm font-medium ${imageUploading
                                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                                : "cursor-pointer bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {imageUploading ? "Uploading..." : "Change Photo"}
                            <input type="file" accept="image/jpeg,image/png,image/webp"
                                className="hidden" onChange={handleImageChange} disabled={imageUploading}
                            />
                        </label>
                        <p className="mt-2 text-xs text-gray-500">JPG, PNG or WEBP. Max 5MB.</p>
                    </div>
                </div>

                {/* FORM profile update */}
                <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                    <Input label="Full Name" name="fullname" value={formData.fullname}
                        onChange={handleChange} placeholder="example name" />
                    <Input label="Email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="you@example.com" type="email"
                    />
                    <Input label="Phone" name="phoneNumber" value={formData.phoneNumber}
                        onChange={handleChange} placeholder="+91 9876543210"
                    />
                    <Input label="Location" name="location" value={formData.location}
                        onChange={handleChange} placeholder="Delhi, India"
                    />
                    <Input label="Job Title" name="jobTitle" value={formData.jobTitle}
                        onChange={handleChange} placeholder="Frontend Developer"
                    />
                    <Input label="Experience" name="experience" value={formData.experience}
                        onChange={handleChange} placeholder="2 Years"
                    />

                    {/* SKILLS */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">Skills</label>
                        <select defaultValue="" onChange={handleSkillChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a skill</option>
                            {SKILL_OPTIONS.map(
                                (skill) => (
                                    <option key={skill} value={skill} disabled={formData.skills.includes(skill)}>
                                        {skill}
                                    </option>
                                )
                            )}
                        </select>

                        {/* Selected Skills */}
                        {formData.skills.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {formData.skills.map(
                                    (skill) => (
                                        <div key={skill} className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                                            <span>{skill}</span>
                                            <button type="button" onClick={() => removeSkill(skill)}
                                                className="text-blue-500 hover:text-red-600"
                                                title={`Remove ${skill}`}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* BIO */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">About Me </label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange}
                            rows={5} placeholder="Tell employers about yourself..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold
                         text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// INPUT COMPONENT

function Input({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text"
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

        </div>
    );
}
