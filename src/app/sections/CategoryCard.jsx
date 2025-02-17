import { Bot } from "lucide-react";
import React from "react";

const CategoryCard = ({ category, count }) => (
  <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg border border-blue-100 p-6 hover:shadow-lg transition-all duration-300 group flex items-center space-x-4">
    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center relative transform group-hover:scale-105 transition-transform duration-300 shadow-sm">
      <div className="absolute inset-0 rounded-lg opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="gridPattern"
            x="0"
            y="0"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-white"
            />
          </pattern>
          <rect width="40" height="40" fill="url(#gridPattern)" />
        </svg>
      </div>
      <Bot className="h-6 w-6 text-white relative" />
    </div>

    <div className="space-y-1">
      <h3 className="font-light text-lg tracking-tight text-blue-900">
        {category}
      </h3>
      <p className="text-sm text-blue-600 tracking-wide font-medium">
        {count.toLocaleString()} agents
      </p>
    </div>
  </div>
);
export default CategoryCard;
