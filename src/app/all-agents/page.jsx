"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Calendar, Eye, Search } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../urls";
import { useSearchParams, useRouter } from "next/navigation";
import { ScheduleMeetingModal } from "../components/ScheduleMeeting";

const AICatalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [assistants, setAssistants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assistantsRes, categoriesRes] = await Promise.all([
          axios.get(
            searchQuery
              ? `${baseURL}/api/assistants/getAssistantDetails?search=${searchQuery}`
              : `${baseURL}/api/assistants/getAssistantDetails`
          ),
          axios.get(`${baseURL}/api/assistants/getCategoryCounts`),
        ]);
        setAssistants(assistantsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`?search=${searchTerm}`);
  };

  const filteredAssistants = assistants.filter(
    (assistant) =>
      selectedCategory === "All Categories" ||
      assistant.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>
      <header className="relative border-b border-blue-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light text-blue-900 tracking-tight mb-3">
            AI Assistant Marketplace
          </h1>
          <p className="text-lg text-blue-600 tracking-wide font-medium">
            Discover powerful AI assistants to enhance your workflow
          </p>
        </div>
      </header>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-6">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assistants..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            </div>
          </form>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("All Categories")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === "All Categories"
                  ? "bg-blue-600 text-white"
                  : "bg-white/80 text-blue-600 hover:bg-white"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.category
                    ? "bg-blue-600 text-white"
                    : "bg-white/80 text-blue-600 hover:bg-white"
                }`}
              >
                {cat.category} ({cat.count})
              </button>
            ))}
          </div>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full">
          {filteredAssistants.map((assistant) => (
            <div
              key={assistant._id}
              className="group relative bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg break-inside-avoid mb-8"
            >
              <div className="absolute inset-0 opacity-20">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.2"
                      className="text-blue-200"
                    />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-blue-50 overflow-hidden">
                <img
                  src={assistant.image}
                  alt={assistant.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-light text-blue-900 tracking-tight">
                    {assistant.name}
                  </h2>
                  <span className="flex items-center justify-center bg-blue-600 text-white px-4 py-1 rounded-full text-sm tracking-wide shadow-sm ml-4 shrink-0">
                    ${assistant.price}
                  </span>
                </div>

                <p className="text-blue-600 mb-6 line-clamp-2 tracking-wide text-sm font-medium">
                  {assistant.description}
                </p>

                <div className="flex justify-end items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-400 tracking-wide">
                      By
                    </span>
                    <span className="text-sm font-medium text-blue-900 tracking-wide">
                      {assistant.creator.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 mb-6">
                <Link
                  href={`/all-agents/${generateSlug(assistant.name)}?id=${
                    assistant._id
                  }`}
                  className="cursor-pointer flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm tracking-wide">View Details</span>
                </Link>

                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="flex items-center space-x-2 bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm tracking-wide">Schedule Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {isScheduleModalOpen && (
        <ScheduleMeetingModal
          isOpen={"schedule"}
          onClose={() => setScheduleModalOpen(false)}
          mode="schedule"
        />
      )}
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AICatalog />
    </Suspense>
  );
};

export default page;
