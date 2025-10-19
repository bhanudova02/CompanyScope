import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

export function Sidebar({ setCompaniesData }) {
  const locationData = ["Bengaluru", "Mumbai", "Pune", "Noida", "Chennai", "Delhi", "Gurgaon"];
  const industriesData = ["IT Services", "Healthcare", "Banking", "Manufacturing"];
  const [allCompanies, setAllCompanies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Fetch data
  useEffect(() => {
    axios.get("https://companyscope-api.onrender.com/api/companies")
      .then(res => {
        setAllCompanies(res.data);
        setCompaniesData(res.data);
      });
  }, [setCompaniesData]);

  // Filter function
  useEffect(() => {
    let filtered = allCompanies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(company => company.location === selectedLocation);
    }

    if (selectedIndustry) {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    setCompaniesData(filtered);
  }, [searchTerm, selectedLocation, selectedIndustry, allCompanies, setCompaniesData]);

  const handleClear = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedIndustry("");
  };

  return (
    <div className="px-4 py-6 h-full flex flex-col justify-between font-medium text-zinc-700">
      <div>
        {/* Search */}
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="bg-white p-2.5 w-full rounded-sm ps-9 focus:outline-none"
            placeholder="Search Company Name"
          />
          <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
        </div>

        {/* Filters */}
        <div className="mt-8 space-y-2">
          <div className="relative w-full">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-200 shadow bg-white focus:outline-none rounded-sm w-full p-2.5 appearance-none pr-8"
            >
              <option value="" disabled>Select Location</option>
              {locationData.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="relative w-full">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="border border-gray-200 shadow bg-white focus:outline-none rounded-sm w-full p-2.5 appearance-none pr-8"
            >
              <option value="" disabled>Select Industry</option>
              {industriesData.map((ind, index) => (
                <option key={index} value={ind}>{ind}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Button */}
      <div>
        <button
          onClick={handleClear}
          className="bg-white p-2.5 w-full rounded-sm font-semibold cursor-pointer"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}