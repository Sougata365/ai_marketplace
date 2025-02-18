"use client";
import { Search, ChevronDown, Star, Award, Users, Zap } from "lucide-react";
import MarketStats from "./sections/MarketStats";
import HeroSlider from "./sections/HeroSlider";
import CategoryCard from "./sections/CategoryCard";
import CreatorCard from "./sections/CreatorCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./urls";
import AllAgents from "./sections/AllAgents";
import { useRouter } from "next/navigation";
import VideoPlayer from "./sections/VideoPlayer";
import EnquiryFormModal from "./components/EnquiryForm";

const Home = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/assistants/getCategoryCounts`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const creators = [
    {
      name: "Sarah Chen",
      expertise: "ML/AI Specialist",
      image:
        "https://images.unsplash.com/photo-1738566495610-8385ed595473?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      agents: "12",
    },
    {
      name: "Michael Ross",
      expertise: "NLP Expert",
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      agents: "8",
    },
    {
      name: "Lisa Kumar",
      expertise: "Automation Engineer",
      image:
        "https://images.unsplash.com/photo-1616325629936-99a9013c29c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      agents: "15",
    },
    {
      name: "David Wilson",
      expertise: "AI Solutions Architect",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      agents: "10",
    },
  ];
  console.log(search, "raju");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <HeroSlider />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-blue-100">
          <div className="flex">
            <button className="flex items-center space-x-2 bg-blue-50 border border-r-0 border-blue-100 rounded-l-lg px-4 py-3 text-sm tracking-wide text-blue-600 font-medium">
              <span>All Categories</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search AI agents..."
                className="text-black w-full px-4 py-3 border border-blue-100 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => router.push(`/all-agents?search=${search}`)}
              >
                <Search className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MarketStats />
      </div>
      <VideoPlayer />
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-light text-blue-900 mb-8 tracking-tight">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div> */}
      <AllAgents />
      <div className="bg-gradient-to-br from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-blue-900 mb-4 tracking-tight">
              Meet Our Top Creators
            </h2>
            <p className="text-blue-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Learn from the best in the industry. Our top creators are building
              the future of AI automation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creators.map((creator, index) => (
              <CreatorCard key={index} {...creator} />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-light text-blue-900 mb-4 tracking-tight">
          Ready to Start?
        </h2>
        <p className="text-blue-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed font-medium">
          Whether you&apos;re building or buying, join our community today.
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-sm tracking-wide"
          >
            Become a Creator
          </button>
          <Link
            href={"/all-agents"}
            className="bg-blue-50 text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-100 transition-colors text-sm tracking-wide border border-blue-100"
          >
            Browse Agents
          </Link>
        </div>
      </div>
      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
