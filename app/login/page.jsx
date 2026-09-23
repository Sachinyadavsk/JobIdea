"use client";

import Link from "next/link";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Role validation
        if (!role) {
            setError("Please select Student or Recruiter.");
            return;
        }

        // Email & password validation
        if (!formData.email.trim() || !formData.password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const requestData = {
                email: formData.email.trim(),
                password: formData.password,
                role: role,
            };

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`,
                requestData
            );

            const data = response.data;
            // console.log("Login API Response:", data);

            // Check API status
            if (data.status === "success") {
                setSuccess(data.message || "Login successful.");

                // Save token
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }

                // Save user
                if (data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                }

                // Get role from API response
                const userRole = data.user?.role || role;

                setTimeout(() => {
                    if (userRole === "recruiter") {
                        router.push("/employer/dashboard");
                    } else if (userRole === "student") {
                        router.push("/candidate/dashboard");
                    } else {
                        router.push("/");
                    }
                }, 1000);

            } else {
                setError(
                    data.message ||
                    "Invalid email, password or role."
                );
            }

        } catch (error) {
            console.error("Login Error:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <Briefcase size={27} />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Login to continue to your account
                    </p>
                </div>

                {/* Role */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                    {/* Student */}
                    <button
                        type="button"
                        onClick={() => {
                            setRole("student");
                            setError("");
                        }}
                        className={`rounded-lg border p-3 text-sm font-semibold transition ${role === "student"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 text-gray-600 hover:border-blue-300"
                            }`}
                    >
                        Student
                    </button>

                    {/* Recruiter */}
                    <button
                        type="button"
                        onClick={() => {
                            setRole("recruiter");
                            setError("");
                        }}
                        className={`rounded-lg border p-3 text-sm font-semibold transition ${role === "recruiter"
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 text-gray-600 hover:border-blue-300"
                            }`}
                    >
                        Recruiter
                    </button>

                </div>

                {/* Selected Role */}
                {role && (
                    <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        Login as:{" "}
                        <span className="font-semibold capitalize text-blue-600">
                            {role}
                        </span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm outline-none focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link
                            href="#"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                {/* Register */}
                <p className="mt-7 text-center text-sm text-gray-500">
                    Don't have an account?{" "}

                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}