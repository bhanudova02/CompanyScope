import { Route, Routes } from "react-router-dom"
import { Card } from "./components/Card"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { useState, useEffect } from "react";
import { Help } from "./components/Help";
import { AboutUs } from "./components/AboutUs";
import { SearchModal } from "./components/SearchModal";

function App() {
  const [companiesData, setCompaniesData] = useState([]);


  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initialCompanies = companiesData.slice(0, 9);
    setDisplayedCompanies(initialCompanies);
    setPage(1);
    setHasMore(companiesData.length > 9);
  }, [companiesData]);

  const fetchMoreData = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newPage = page + 1;
      const newCompanies = companiesData.slice(0, newPage * 9);

      setDisplayedCompanies(newCompanies);
      setPage(newPage);
      setHasMore(newCompanies.length < companiesData.length);
      setLoading(false);
    }, 500);
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block w-[22%] bg-[#245078]">
        <Sidebar setCompaniesData={setCompaniesData} />
      </div>
      {/* Container Area */}
      <div className=" bg-[#fffefe] flex-1 flex flex-col">
        <Header />
         <div>
           <SearchModal setCompaniesData={setCompaniesData} />
         </div>

        <div id="scrollableDiv" className="flex-1 overflow-y-auto  p-4 relative">
          <Routes>
            <Route path="/" element={<Card companiesData={displayedCompanies} fetchMoreData={fetchMoreData} hasMore={hasMore} loading={loading} />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
      </div>

    </main>
  )
}

export default App
