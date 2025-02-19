"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Star,
  Users,
  Clock,
  ChevronRight,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Table,
} from "lucide-react";
import Link from "next/link";
import { baseURL } from "@/app/urls";

const AIDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [assistant, setAssistant] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const supplementaryData = {
    features: [
      {
        title: "Automated Scheduling",
        description:
          "AI-powered scheduling system that coordinates property viewings based on your availability",
      },
      {
        title: "Smart Property Matching",
        description:
          "Advanced algorithm that learns your preferences to suggest relevant properties",
      },
      {
        title: "Follow-up Automation",
        description:
          "Automated follow-ups with clients and property owners to keep deals moving",
      },
      {
        title: "Market Analysis",
        description: "Real-time market analysis and property value predictions",
      },
    ],
    integrations: [
      {
        name: "Google Calendar",
        icon: Calendar,
        description: "Sync appointments and viewings",
      },
      {
        name: "ChatGPT",
        icon: MessageSquare,
        description: "Enhanced property descriptions",
      },
      {
        name: "Google Sheets",
        icon: Table,
        description: "Export property data and analytics",
      },
    ],
  };

  useEffect(() => {
    const fetchAssistant = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/assistants/getAssistantDetailsById?id=${id}`
        );
        setAssistant({
          ...response.data,
          features: supplementaryData.features,
          integrations: supplementaryData.integrations,
          howToUse:
            response.data.howToUse.length === 1
              ? [
                  response.data.howToUse[0],
                  {
                    step: 2,
                    title: "Property Search",
                    description:
                      "Start searching for properties or let PropertyMate suggest matches",
                    _id: "custom-step-2",
                  },
                  {
                    step: 3,
                    title: "Schedule Viewings",
                    description:
                      "Use the automated scheduling system to book property viewings",
                    _id: "custom-step-3",
                  },
                  {
                    step: 4,
                    title: "Follow-up Management",
                    description:
                      "Let PropertyMate handle follow-ups and keep track of interactions",
                    _id: "custom-step-4",
                  },
                ]
              : response.data.howToUse,
        });
      } catch (error) {
        console.error("Error fetching assistant details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssistant();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">
          Assistant not found
        </h1>
        <Link
          href="/all-agents"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-blue-500">
            <Link href="/all-agents" className="hover:text-blue-700">
              Marketplace
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-blue-900">Assistant Details</span>
          </nav>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-8">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg"
                style={{ paddingTop: "56.25%" }}
              >
                <iframe
                  src={assistant.videoLink}
                  title={assistant.name}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-6 bg-blue-50 rounded-xl shadow-sm">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="text-xl font-semibold text-blue-900">
                    {assistant.rating || 0}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-xl font-semibold text-blue-900">
                    {assistant.activeUsers || 0}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Active Users</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-xl font-semibold text-blue-900">
                    {assistant.creator.stats.support}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Support</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Core Features
              </h2>
              <div className="space-y-4">
                {assistant.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <h3 className="font-medium text-blue-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-blue-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-4">
                {assistant.name}
              </h1>
              <p className="text-lg text-blue-600">{assistant.description}</p>
            </div>
            <div className="border-t border-b border-blue-100 py-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-blue-900">
                  ${assistant.price}
                </span>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Purchase Now
                </button>
              </div>
              <p className="text-sm text-blue-500">
                * Price includes lifetime access and{" "}
                {assistant.creator.stats.support} support
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Integrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assistant.integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl text-center shadow-sm border border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <integration.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-medium text-blue-900 mb-1">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-blue-600">
                      {integration.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                How to Use
              </h2>
              <div className="space-y-4">
                {assistant.howToUse.map((step) => (
                  <div
                    key={step._id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-medium text-blue-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-blue-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                About the Creator
              </h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:border-blue-200 transition-colors">
                <h3 className="font-medium text-blue-900 mb-2">
                  {assistant.creator.name}
                </h3>
                <p className="text-blue-600">{assistant.creator.description}</p>
                <div className="mt-4 text-sm text-blue-500">
                  <p>Total Clients: {assistant.creator.stats.clients}</p>
                  <p>Creator Rating: {assistant.creator.stats.rating}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AIDetailsPage />
    </Suspense>
  );
};

export default page;
