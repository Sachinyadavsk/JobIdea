"use client";

const FilterSidebar = ({ filters, setFilters }) => {
  const handleCheckbox = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name] === value ? "" : value,
    }));
  };

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
          onClick={() => setFilters({
            jobType: "",
            experienceLevel: "",
            salary: "",
          })
          }
          className="text-xs font-medium text-blue-600 hover:text-blue-700">
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="mb-4 text-sm font-semibold">Job Type</h4>
        <div className="space-y-3">
          {["Full Time", "Part Time", "Internship", "Contract"].map((jobType) => (
            <label key={jobType} className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={filters.jobType === jobType}
                onChange={() => handleCheckbox("type", jobType)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              {jobType}
            </label>
          )
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="border-b border-gray-200 py-6">
        <h4 className="mb-4 text-sm font-semibold">Experience</h4>
        <div className="space-y-3">
          {["1", "2", "3", "5"].map((experienceLevel) => (
            <label key={experienceLevel} className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={filters.experienceLevel === experienceLevel}
                onChange={() => handleCheckbox("experience", experienceLevel)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              {experienceLevel}
            </label>
          )
          )}
        </div>
      </div>

      {/* Salary */}
      <div className="border-b border-gray-200 py-6">
        <h4 className="mb-4 text-sm font-semibold">Salary</h4>
        <div className="space-y-3">
          {["12", "6", "8", "3"].map((salary) => (
            <label key={salary} className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={filters.salary === salary}
                onChange={() => handleCheckbox("salary", salary)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              {salary}
            </label>
          )
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;