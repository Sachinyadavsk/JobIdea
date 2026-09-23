"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({
        fullname: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Role validation
        if (!role) {
            setError("Please select Student or Recruiter.");
            return;
        }

        // Required field validation
        if (
            !formData.fullname.trim() ||
            !formData.phoneNumber.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill all fields.");
            return;
        }

        // Phone validation
        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const requestData = {
                fullname: formData.fullname.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: role,
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, requestData);
            const data = response.data;
            if (data.success === true) {
                setSuccess(data.message || "Account created successfully.");

                // Clear form
                setFormData({
                    fullname: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setRole(null);
                // Redirect to login
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Register Error:", error);
            setError(error.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <Briefcase size={27} />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold">Create Your Account</h1>
                    <p className="mt-2 text-sm text-gray-500">Join JobPortal and find your next opportunity</p>
                </div>

                {/* Role Selection */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                    {/* Student */}
                    <button
                        type="button"
                        onClick={() => { setRole("student"); setError(""); }}
                        className={`rounded-lg border p-3 text-sm font-semibold ${role === "student"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 text-gray-600"
                            }`}>
                        Student
                    </button>

                    {/* Recruiter */}
                    <button
                        type="button"
                        onClick={() => { setRole("recruiter"); setError(""); }}
                        className={`rounded-lg border p-3 text-sm font-semibold ${role === "recruiter"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 text-gray-600"
                            }`}
                    >
                        Recruiter
                    </button>

                </div>

                {/* Selected Role */}
                {role && (
                    <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        Registering as:{" "}
                        <span className="font-semibold capitalize text-blue-600">{role}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Login */}
                <p className="mt-7 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">Login</Link>
                </p>
            </div>
        </div>
    );
}