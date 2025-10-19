import { HiBriefcase } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { useCallback, useRef } from "react";

export function Card({ companiesData, fetchMoreData, hasMore, loading }) {
    const observer = useRef();
    const lastCompanyElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreData();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchMoreData]);

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 p-1 lg:p-8 gap-3 lg:gap-6">
                {companiesData && companiesData.length > 0 ? (
                    companiesData.map((company, index) => {
                        if (companiesData.length === index + 1) {
                            return (
                                <div ref={lastCompanyElementRef} key={index} className="bg-[#fffefe] border border-gray-200 p-6 rounded-md">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600">{company.name}</h2>
                                    <div className="text-gray-500 font-medium space-y-1 mt-2">
                                        <div className="flex items-start md:items-center gap-1"><ImLocation className="text-base md:text-lg text-[#a4b7ca]" /> {company.location}</div>
                                        <div className="flex items-start md:items-center gap-1"><HiBriefcase className="text-base md:text-lg text-[#8097b1]" /> {company.industry}</div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="bg-[#fffefe] border border-gray-200 p-6 rounded-md">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-zinc-600">{company.name}</h2>
                                    <div className="text-gray-500 font-medium space-y-1 mt-2 text-xs">
                                        <div className="flex items-start md:items-center gap-1"><ImLocation className="text-base md:text-lg text-[#a4b7ca]" /> {company.location}</div>
                                        <div className="flex items-start md:items-center gap-1"><HiBriefcase className="text-base md:text-lg text-[#8097b1]" /> {company.industry}</div>
                                    </div>
                                </div>
                            )
                        }
                    })
                ) : (
                    <div className="col-span-4 text-center text-gray-500">
                        No companies found.
                    </div>
                )}
            </div>
            {loading && (
                <div className="flex justify-center items-center p-4">
                    <AiOutlineLoading className="animate-spin text-4xl text-gray-500" />
                </div>
            )}
            {!hasMore && !loading && companiesData.length > 0 && (
                <div className="text-center text-gray-500 p-4">
                    {/* No more companies to load. */}
                </div>
            )}
        </div>
    )
}