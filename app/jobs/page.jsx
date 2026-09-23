"use client";

import { useEffect, useMemo, useState } from "react";
import JobCard from "../../components/JobCard";
import FilterSidebar from "../../components/FilterSidebar";
import SearchBar from "../../components/SearchBar";
import axios from "axios";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: "",
    experienceLevel: "",
    salary: "",
    remote: "",
  });

  const [search, setSearch] = useState({
    keyword: "",
    location: "",
  });

  // Get jobs
  const getJobList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get`);
      const data = response.data;
      console.log("Jobs API Response:", data);
      if (data.success) {
        setJobs(data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Get Job List Error:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobList();
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const companyName = typeof job.company === "object" ? job.company?.name || "" : job.company || "";
      const jobTitle = job.title || "";
      const jobLocation = job.location || "";

      // Keyword
      const keyword = search.keyword.trim().toLowerCase();
      const keywordMatch = !keyword || jobTitle.toLowerCase().includes(keyword) || companyName.toLowerCase().includes(keyword);

      // Location
      const location = search.location.trim().toLowerCase();
      const locationMatch = !location || jobLocation.toLowerCase().includes(location);

      // Job Type
      const typeMatch = !filters.jobType || job.jobType === filters.jobType;

      // Experience
      const experienceMatch = !filters.experienceLevel || String(job.experienceLevel) === String(filters.experienceLevel);

      // Salary
      let salaryMatch = true;
      if (filters.salary) {
        const salary = Number(job.salary || 0);
        if (filters.salary === "0-5") {
          salaryMatch = salary <= 5;
        }
        if (filters.salary === "5-10") {
          salaryMatch = salary > 5 && salary <= 10;
        }
        if (filters.salary === "10-20") {
          salaryMatch = salary > 10 && salary <= 20;
        }
        if (filters.salary === "20+") {
          salaryMatch = salary > 20;
        }
      }

      // Remote
      let remoteMatch = true;
      if (filters.remote) {
        if (filters.remote === "Remote") {
          remoteMatch = job.jobType?.toLowerCase() === "remote";
        }
        if (filters.remote === "Onsite") {
          remoteMatch = job.jobType?.toLowerCase() !== "remote";
        }
      }

      return (
        keywordMatch &&
        locationMatch &&
        typeMatch &&
        experienceMatch &&
        salaryMatch &&
        remoteMatch
      );
    });
  }, [jobs, filters, search]);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Find Your Next Job
          </h1>

          <p className="mt-3 text-blue-100">
            Explore thousands of opportunities from top companies.
          </p>

          <div className="mt-8">
            <SearchBar onSearch={setSearch} />
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
            />

            {/* Job List */}
            <div>
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    {filteredJobs.length} Jobs Found
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Browse available opportunities
                  </p>
                </div>

                <select
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none"
                >
                  <option>Most Recent</option>
                  <option>Salary: High to Low</option>
                  <option>Salary: Low to High</option>
                </select>
              </div>

              {/* Loading */}
              {loading ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                  <p className="text-gray-500">
                    Loading jobs...
                  </p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                  <h3 className="text-lg font-bold">
                    No jobs found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}