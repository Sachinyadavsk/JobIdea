"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

import SaveJobButton from "../components/SaveJobButton";
import { getSavedJobs } from "../services/savedJobService.js";

/* =========================
   TYPES
========================= */

interface Company {
  _id: string;
  name: string;
  location?: string;
}

interface Job {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  jobType?: string;
  salary?: number | string;
  company?: Company | null;
}

interface SavedJob {
  _id: string;
  job?: Job | string | null;
}

interface User {
  _id: string;
  fullname?: string;
  email?: string;
}

/* =========================
   CATEGORIES
========================= */

const categories = [
  {
    name: "Software Development",
    jobs: "1,250 Jobs",
    icon: "💻",
  },
  {
    name: "Marketing",
    jobs: "850 Jobs",
    icon: "📢",
  },
  {
    name: "Design",
    jobs: "620 Jobs",
    icon: "🎨",
  },
  {
    name: "Finance",
    jobs: "540 Jobs",
    icon: "💰",
  },
  {
    name: "Sales",
    jobs: "780 Jobs",
    icon: "📈",
  },
  {
    name: "Customer Service",
    jobs: "430 Jobs",
    icon: "🎧",
  },
];

/* =========================
   HOME
========================= */

export default function Home() {
  const [jobslist, setJobslist] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [savedJobsLoading, setSavedJobsLoading] =
    useState<boolean>(false);

  /* =========================
     GET LOGGED USER
  ========================= */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error: unknown) {
      console.error("User data error:", error);
      setUser(null);
    }
  }, []);

  /* =========================
     GET JOBS
  ========================= */

  const getJobList = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/job/get`
      );

      const data = response.data;

      if (data?.success === true) {
        setJobslist(Array.isArray(data.jobs) ? data.jobs : []);
      } else {
        setJobslist([]);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Get Job List Error:",
          error.response?.data || error.message
        );
      } else {
        console.error("Get Job List Error:", error);
      }

      setJobslist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobList();
  }, []);

  /* =========================
     GET USER SAVED JOBS
  ========================= */

  const getUserSavedJobs = async (): Promise<void> => {
    if (!user?._id) {
      setSavedJobs([]);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setSavedJobs([]);
      return;
    }

    try {
      setSavedJobsLoading(true);

      const data = await getSavedJobs();

      if (
        data?.success === true &&
        Array.isArray(data.savedJobs)
      ) {
        const savedJobIds: string[] = data.savedJobs
          .map((item: SavedJob) => {
            if (!item?.job) {
              return null;
            }

            if (typeof item.job === "string") {
              return item.job;
            }

            return item.job._id;
          })
          .filter(
            (id: string | null): id is string => Boolean(id)
          );

        setSavedJobs(savedJobIds);
      } else {
        setSavedJobs([]);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Get Saved Jobs Error:",
          error.response?.data || error.message
        );
      } else {
        console.error("Get Saved Jobs Error:", error);
      }

      setSavedJobs([]);
    } finally {
      setSavedJobsLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getUserSavedJobs();
    } else {
      setSavedJobs([]);
    }
  }, [user?._id]);

  /* =========================
     SAVED JOB CHANGE
  ========================= */

  const handleSavedJobChange = (
    jobId: string,
    isSaved: boolean
  ): void => {
    setSavedJobs((prev: string[]) => {
      if (isSaved) {
        if (prev.includes(jobId)) {
          return prev;
        }

        return [...prev, jobId];
      }

      return prev.filter((id: string) => id !== jobId);
    });
  };

  /* =========================
     UI
  ========================= */

  return (
    <div>
      {/* HERO */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
              Find your next opportunity
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="text-blue-600">Dream Job</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Search thousands of jobs from top companies and
              take the next step in your career.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-2 rounded-xl bg-white p-3 shadow-xl md:flex-row">
              <div className="flex flex-1 items-center gap-3 border-b border-gray-200 px-3 md:border-b-0 md:border-r">
                <Search
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  className="w-full py-3 text-sm outline-none"
                />
              </div>

              <div className="flex flex-1 items-center gap-3 px-3">
                <MapPin
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Location"
                  className="w-full py-3 text-sm outline-none"
                />
              </div>

              <Link
                href="/jobs"
                className="flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Search Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <Briefcase
              className="text-blue-600"
              size={30}
            />

            <div>
              <h3 className="text-2xl font-bold">25K+</h3>
              <p className="text-sm text-gray-500">
                Active Jobs
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Building2
              className="text-blue-600"
              size={30}
            />

            <div>
              <h3 className="text-2xl font-bold">5K+</h3>
              <p className="text-sm text-gray-500">
                Companies
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Users
              className="text-blue-600"
              size={30}
            />

            <div>
              <h3 className="text-2xl font-bold">100K+</h3>
              <p className="text-sm text-gray-500">
                Job Seekers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Explore Opportunities
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Popular Categories
              </h2>
            </div>

            <Link
              href="/jobs"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600"
            >
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                href="/jobs"
                key={category.name}
                className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
              >
                <div className="mb-5 text-3xl">
                  {category.icon}
                </div>

                <h3 className="font-semibold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {category.jobs}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Latest Opportunities
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Featured Jobs
              </h2>
            </div>

            <Link
              href="/jobs"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600"
            >
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* SAVED JOBS LOADING */}
          {savedJobsLoading && user?._id && (
            <div className="mb-4 text-center text-sm text-gray-400">
              Checking saved jobs...
            </div>
          )}

          {/* JOBS LOADING */}
          {loading && (
            <div className="py-10 text-center text-gray-500">
              Loading jobs...
            </div>
          )}

          {/* NO JOBS */}
          {!loading && jobslist.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white py-10 text-center text-gray-500">
              No jobs found.
            </div>
          )}

          {/* JOBS */}
          {!loading && jobslist.length > 0 && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {jobslist.slice(0, 6).map((job: Job) => {
                const isSaved = savedJobs.includes(
                  job._id
                );

                return (
                  <div
                    key={job._id}
                    className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* TOP */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
                        {job.company?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}
                      </div>

                      {user?._id && (
                        <SaveJobButton
                          jobId={job._id}
                          saved={isSaved}
                          onChange={handleSavedJobChange}
                        />
                      )}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-lg font-bold">
                      {job.title || "Job Title"}
                    </h3>

                    {/* COMPANY */}
                    <p className="mt-1 text-sm text-gray-500">
                      {job.company?.name || "Company"}
                    </p>

                    {/* DETAILS */}
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} />

                        {job.location ||
                          "Location not specified"}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Briefcase size={15} />

                        {job.jobType || "Full Time"}
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                      <span className="text-sm font-bold">
                        ₹{job.salary ?? 0} LPA
                      </span>

                      <Link
                        href={`/jobs/${job._id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View Job
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}