"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../urls";
import { useSearchParams } from "next/navigation";

const AICatalog = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await axios.get(
          searchQuery
            ? `${baseURL}/api/assistants/getAssistantDetails?search=${searchQuery}`
            : `${baseURL}/api/assistants/getAssistantDetails`
        );
        setAssistants(response.data);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <header className="border-b border-blue-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light text-blue-900 tracking-tight mb-3">
            AI Assistant Marketplace
          </h1>
          <p className="text-lg text-blue-600 tracking-wide font-medium">
            Discover powerful AI assistants to enhance your workflow
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance] w-full">
          {assistants.map((assistant) => (
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

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-400 tracking-wide">
                      By
                    </span>
                    <span className="text-sm font-medium text-blue-900 tracking-wide">
                      {assistant.creator.name}
                    </span>
                  </div>

                  <Link
                    href={`/all-agents/${generateSlug(assistant.name)}?id=${
                      assistant._id
                    }`}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 group shadow-sm hover:shadow-md"
                  >
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm tracking-wide">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AICatalog;
