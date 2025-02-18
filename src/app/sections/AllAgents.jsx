import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../urls";

const AICatalog = () => {
  const [assistants, setAssistants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Real Estate Industry"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/assistants/getAssistantDetails`,
          { params: selectedCategory ? { category: selectedCategory } : {} }
        );

        const sortedAssistants = response.data.sort((a, b) => {
          if (a.category === "Real Estate Industry") return -1;
          if (b.category === "Real Estate Industry") return 1;
          return 0;
        });

        setAssistants(sortedAssistants);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/assistants/getCategoryCounts`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAssistants();
    fetchCategories();
  }, [selectedCategory]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
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
          <div className="mt-4">
            <label className="block text-blue-900 text-sm font-medium">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-2 p-2 border border-blue-300 rounded-lg bg-white text-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assistants.map((assistant) => (
            <div
              key={assistant._id}
              className="group flex flex-col bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg h-[500px]"
            >
              <div className="h-48 bg-blue-50 overflow-hidden">
                <img
                  src={assistant.image}
                  alt={assistant.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-light text-blue-900 tracking-tight line-clamp-2">
                    {truncateText(assistant.name, 50)}
                  </h2>
                  <span className="flex items-center justify-center bg-blue-600 text-white px-4 py-1 rounded-full text-sm tracking-wide shadow-sm ml-4 shrink-0">
                    ${assistant.price}
                  </span>
                </div>

                <p className="text-blue-600 mb-6 tracking-wide text-sm font-medium line-clamp-4">
                  {assistant.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
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
