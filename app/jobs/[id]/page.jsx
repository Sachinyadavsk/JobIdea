"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import SaveJobButton from "../../../components/SaveJobButton";

export default function JobDetailsPage() {
  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState({
    responsibilities: [],
    requirements: [],
    skills: [],
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  console.log("job details id", id);

  // Get job by ID
  const getJobByIdDetails = async (jobByid) => {
    if (!jobByid) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/job/getDetailsByid/${jobByid}`
      );

      const data = res.data;

      if (data.success === true) {
        setJobDetails({
          ...data.job,
          responsibilities: data.job?.responsibilities || [],
          requirements: data.job?.requirements || [],
          skills: data.job?.skills || [],
        });
      } else {
        setJobDetails({
          responsibilities: [],
          requirements: [],
          skills: [],
        });
      }
    } catch (error) {
      console.error(
        "Get Job Details Error:",
        error.response?.data || error.message
      );

      setJobDetails({
        responsibilities: [],
        requirements: [],
        skills: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Check whether this job is already saved
  const checkSavedJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !jobId) {
        setSaved(false);
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-jobs/check/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setSaved(res.data.isSaved);
      }
    } catch (error) {
      console.error(
        "Check Saved Job Error:",
        error.response?.data || error.message
      );

      setSaved(false);
    }
  };

  useEffect(() => {
    if (id) {
      getJobByIdDetails(id);
      checkSavedJob(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (!jobDetails?._id) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">Job not found</h2>
          <Link href="/jobs" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/jobs"
            className="mb-8 flex w-fit items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-3xl font-bold text-blue-600">
              {jobDetails.company?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">{jobDetails.title} </h1>
              <p className="mt-2 text-blue-100">{jobDetails.company?.name || "Company"}</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-blue-100">
                <span className="flex items-center gap-2"><MapPin size={16} />{jobDetails.location || "Location not specified"}</span>
                <span className="flex items-center gap-2"><Briefcase size={16} />{jobDetails.jobType || "Full Time"}</span>
                <span>₹{jobDetails.salary || 0} LPA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          {/* Main */}
          <div className="space-y-8">
            {/* Description */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Job Description</h2>
              <p className="mt-4 leading-7 text-gray-600">{jobDetails.description || "No description available."}</p>
            </div>

            {/* Responsibilities */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Responsibilities</h2>
              {jobDetails.responsibilities.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {jobDetails.responsibilities.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-gray-600">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No responsibilities specified.</p>
              )}
            </div>

            {/* Requirements */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Requirements</h2>
              {jobDetails.requirements.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {jobDetails.requirements.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-gray-600">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No requirements specified.</p>
              )}
            </div>

            {/* Skills */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Skills</h2>
              {jobDetails.skills.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {jobDetails.skills.map((skill, index) => (
                    <span key={`${skill}-${index}`} className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No skills specified.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6">
              {/* Apply */}
              <Link
                href={`/jobs/${jobDetails._id}/apply`}
                className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Apply Now
              </Link>

              {/* Save Job */}
              <div className="mt-3 flex w-full items-center justify-center rounded-lg border border-gray-300 py-3">
                <SaveJobButton jobId={jobDetails._id} saved={saved} onChange={(jobId, isSaved) => { setSaved(isSaved); }} />
              </div>

              {/* Job Overview */}
              <div className="mt-7 border-t border-gray-200 pt-6">
                <h3 className="font-bold">Job Overview</h3>
                <div className="mt-5 space-y-5">
                  {/* Job Type */}
                  <div className="flex gap-3">
                    <Briefcase className="text-blue-600" size={19} />
                    <div>
                      <p className="text-xs text-gray-500">Job Type</p>
                      <p className="mt-1 text-sm font-medium">{jobDetails.jobType || "Not specified"}</p>
                    </div>
                  </div>

                  {/* Work Mode */}
                  <div className="flex gap-3">
                    <Building2 className="text-blue-600" size={19} />
                    <div>
                      <p className="text-xs text-gray-500">Work Mode</p>
                      <p className="mt-1 text-sm font-medium">{jobDetails.workMode || "Not specified"}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-3">
                    <MapPin className="text-blue-600" size={19} />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="mt-1 text-sm font-medium">{jobDetails.location || "Not specified"}</p>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="flex gap-3">
                    <Briefcase className="text-blue-600" size={19} />
                    <div>
                      <p className="text-xs text-gray-500">Salary</p>
                      <p className="mt-1 text-sm font-medium">₹{jobDetails.salary || 0} LPA</p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex gap-3">
                    <Briefcase className="text-blue-600" size={19} />
                    <div>
                      <p className="text-xs text-gray-500"> Experience</p>
                      <p className="mt-1 text-sm font-medium">{jobDetails.experienceLevel || 0} years </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}