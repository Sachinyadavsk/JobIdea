"use client";

import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../../../components/JobCard";

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get company jobs
  const getCompanyJobs = async (companyId) => {
    if (!companyId) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/companybyid/joblist/get/${companyId}`);
      const data = res.data;
      if (data.success === true) {
        const companyJobs = data.jobs || [];
        setJobs(companyJobs);
        // Company information comes from populated job.company
        if (companyJobs.length > 0 && companyJobs[0]?.company) {
          setCompany(companyJobs[0].company);
        } else {
          setCompany(null);
        }
      } else {
        setJobs([]);
        setCompany(null);
        setError(data.message || "Company jobs not found.");
      }
    } catch (error) {
      console.error("Get Company Jobs Error:", error.response?.data || error.message);
      setJobs([]);
      setCompany(null);
      setError(error.response?.data?.message || "Failed to load company details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCompanyJobs(id);
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-gray-500">Loading company details...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-10">
            <h2 className="text-xl font-bold text-red-700">Company not found</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <Link
              href="/companies"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Companies
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Company not available
  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-700">Company information not available</h2>
          <Link href="/companies" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft size={16} />Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Company Header */}
      <section className="bg-blue-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/companies" className="flex w-fit items-center gap-2 text-sm text-blue-100 hover:text-white">
            <ArrowLeft size={17} /> Back to Companies
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Company Logo */}
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-3xl font-bold text-blue-600">
              {company?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">{company?.name || "Company"}</h1>
              <div className="mt-3 flex flex-wrap gap-5 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />{company?.location || "Location not specified"}
                </span>
                {company?.industry && (
                  <span>{company.industry}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold">About {company?.name || "Company"}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              {company?.description || "No company description available."}
            </p>

            <div className="mt-6 flex flex-wrap gap-8">
              {/* Industry */}
              <div>
                <p className="text-xs text-gray-500">Industry</p>
                <p className="mt-1 font-semibold">{company?.industry || "Not specified"}</p>
              </div>

              {/* Employees */}
              <div>
                <p className="text-xs text-gray-500"> Employees</p>
                <p className="mt-1 font-semibold">{company?.employees || "Not specified"}</p>
              </div>

              {/* Open Jobs */}
              <div>
                <p className="text-xs text-gray-500">Open Jobs</p>
                <p className="mt-1 font-semibold">{jobs.length}</p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mt-10">
            <div className="mb-6 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={22} />
              <h2 className="text-2xl font-bold">Open Positions</h2>
            </div>

            {/* No Jobs */}
            {jobs.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <Briefcase size={40} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-700">No open positions</h3>
                <p className="mt-2 text-sm text-gray-500">This company currently has no availablejob openings.</p>
              </div>
            )}

            {/* Jobs */}
            {jobs.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}