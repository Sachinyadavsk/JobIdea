"use client";

import { useEffect, useState } from "react";
import CompanyCard from "../../components/CompanyCard";
import { Search } from "lucide-react";
import axios from "axios";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get companies from API
    const getCompanies = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/visit/get`);
            const data = res.data;
            if (data.success === true) {
                setCompanies(data.companies || []);
            } else {
                setCompanies([]);
                setError(data.message || "No companies found.");
            }
        } catch (error) {
            console.error("Get Companies Error:", error.response?.data || error.message);
            setCompanies([]);
            setError(error.response?.data?.message || "Failed to load companies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    // Search companies
    const filteredCompanies = companies.filter((company) =>
        company?.name
            ?.includes(search)
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">Top Companies</h1>
                    <p className="mx-auto mt-4 max-w-xl text-blue-100"> Discover companies and explore their latest job opportunities.</p>

                    {/* Search */}
                    <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-xl bg-white px-4 py-2">
                        <Search size={20} className="text-gray-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search companies..." className="w-full py-3 outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Companies */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Loading */}
                    {loading && (
                        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                            <p className="text-gray-500"> Loading companies...</p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
                            <p className="text-red-600">{error}</p>
                            <button
                                type="button"
                                onClick={getCompanies}
                                className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* No companies */}
                    {!loading &&
                        !error &&
                        filteredCompanies.length === 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                                <h2 className="text-lg font-semibold text-gray-700">No companies found</h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    {search
                                        ? `No companies match "${search}".`
                                        : "No companies are available."}
                                </p>
                            </div>
                        )}

                    {/* Company Grid */}
                    {!loading && !error && filteredCompanies.length > 0 && (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredCompanies.map((company) => (
                                <CompanyCard key={company._id || company.id} company={company} />
                            ))}
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}