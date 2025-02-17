import React from "react";
import {
  Search,
  ChevronDown,
  Star,
  Award,
  Users,
  Zap,
  ArrowLeft,
  ArrowRight,
  BarChart,
} from "lucide-react";

const MarketStats = () => {
  const stats = [
    {
      value: "1,000+",
      label: "AI Agents",
      icon: <Zap className="h-6 w-6 text-blue-600" />,
    },
    {
      value: "50K+",
      label: "Active Users",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      value: "$2M+",
      label: "Creator Earnings",
      icon: <BarChart className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden border border-blue-100"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <pattern
                id={`grid-${index}`}
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
              <rect width="100" height="100" fill={`url(#grid-${index})`} />
            </svg>
          </div>

          <div className="flex items-center space-x-6 relative">
            <div className="bg-white rounded-lg p-4 shadow-sm transform group-hover:scale-105 transition-transform duration-300 border border-blue-50">
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-light tracking-tight text-blue-900 mb-1">
                {stat.value}
              </p>
              <p className="text-blue-600 tracking-wide text-sm font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;
