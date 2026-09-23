"use client";

import { MapPin, Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch({
        keyword,
        location,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-lg md:flex-row"
    >
      <div className="flex flex-1 items-center gap-3 border-b border-gray-200 px-3 md:border-b-0 md:border-r">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keywords..."
          className="w-full py-3 text-sm outline-none"
        />
      </div>

      <div className="flex flex-1 items-center gap-3 px-3">
        <MapPin size={19} className="text-gray-400" />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full py-3 text-sm outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Search Jobs
      </button>
    </form>
  );
};

export default SearchBar;