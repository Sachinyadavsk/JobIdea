export default function PostJobPage() {
    return (
        <div>

            <h1 className="text-2xl font-bold">
                Post a New Job
            </h1>

            <p className="mt-1 text-sm text-gray-500">
                Create a job listing and find the right candidate.
            </p>

            <form className="mt-7 rounded-xl border border-gray-200 bg-white p-6">

                <div className="grid gap-5 md:grid-cols-2">

                    <Input
                        label="Job Title"
                        placeholder="Frontend Developer"
                    />

                    <Input
                        label="Company Name"
                        placeholder="Your Company"
                    />

                    <Input
                        label="Location"
                        placeholder="Delhi, India"
                    />

                    <Select
                        label="Job Type"
                        options={[
                            "Full Time",
                            "Part Time",
                            "Internship",
                            "Contract",
                        ]}
                    />

                    <Input
                        label="Salary"
                        placeholder="₹6 - ₹10 LPA"
                    />

                    <Select
                        label="Experience"
                        options={[
                            "Fresher",
                            "1-3 Years",
                            "3-5 Years",
                            "5+ Years",
                        ]}
                    />

                    <Select
                        label="Work Mode"
                        options={[
                            "Remote",
                            "On-site",
                            "Hybrid",
                        ]}
                    />

                    <Input
                        label="Skills"
                        placeholder="React, Next.js, JavaScript"
                    />

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium">
                            Job Description
                        </label>

                        <textarea
                            rows="6"
                            placeholder="Describe the job..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium">
                            Requirements
                        </label>

                        <textarea
                            rows="5"
                            placeholder="List job requirements..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="mt-6 rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Publish Job
                </button>

            </form>

        </div>
    );
}

function Input({ label, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
        </div>
    );
}

function Select({ label, options }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
                <option value="">Select {label}</option>

                {options.map((option) => (
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}