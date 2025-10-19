import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

export function SearchModal({ setCompaniesData }) {
    const locationData = ["Bengaluru", "Mumbai", "Pune", "Noida", "Chennai", "Delhi", "Gurgaon"];
    const industriesData = ["IT Services", "Healthcare", "Banking", "Manufacturing"];
    const [allCompanies, setAllCompanies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");

    // Fetch data
    useEffect(() => {
        axios.get("http://localhost:5000/api/companies")
            .then(res => {
                setAllCompanies(res.data);
            });
    }, []);

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

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <div>
            <button
                onClick={toggleModal}
                className="fixed bottom-10 right-6 z-50 flex items-center gap-1 px-4 py-3 
        bg-gradient-to-r from-[#245078] to-[#408acf] text-white 
        font-medium rounded-md shadow-lg hover:shadow-xl hover:scale-105 
        transition-all duration-300 ease-in-out"
            >
                <IoSearch size={20} /> Search Companies
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800">Filter Companies</h2>
                            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-800">
                                <FiX size={28} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 p-3 w-full rounded-md ps-10 focus:outline-none focus:ring-2 focus:ring-[#245078]"
                                    placeholder="Search Company Name"
                                />
                                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative w-full">
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="border border-gray-300 bg-gray-50 focus:outline-none rounded-md w-full p-3 appearance-none pr-8 focus:ring-2 focus:ring-[#245078]"
                                    >
                                        <option value="" disabled>Select Location</option>
                                        {locationData.map((loc, index) => (
                                            <option key={index} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <FiChevronDown className="h-5 w-5 text-gray-500" />
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <select
                                        value={selectedIndustry}
                                        onChange={(e) => setSelectedIndustry(e.target.value)}
                                        className="border border-gray-300 bg-gray-50 focus:outline-none rounded-md w-full p-3 appearance-none pr-8 focus:ring-2 focus:ring-[#245078]"
                                    >
                                        <option value="" disabled>Select Industry</option>
                                        {industriesData.map((ind, index) => (
                                            <option key={index} value={ind}>{ind}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <FiChevronDown className="h-5 w-5 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                onClick={handleClear}
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={toggleModal}
                                className="bg-[#245078] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#1e4263] transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}