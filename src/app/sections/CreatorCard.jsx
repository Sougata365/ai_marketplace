import React from "react";
import { Star } from "lucide-react";

const CreatorCard = ({ name, expertise, image, rating, agents }) => (
  <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg border border-blue-100 p-8 hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-center space-x-6 mb-6">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover relative border-2 border-white shadow-sm"
        />
      </div>
      <div>
        <h3 className="font-light text-xl tracking-tight text-blue-900 mb-1">
          {name}
        </h3>
        <p className="text-blue-600 text-sm tracking-wide font-medium">
          {expertise}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center space-x-2 pb-4 border-b border-blue-100">
        <Star className="h-4 w-4 text-blue-600 fill-current" />
        <span className="text-sm text-blue-600 tracking-wide font-medium">
          {rating} creator rating
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-600 tracking-wide font-medium">
          {agents} published agents
        </span>
        <button className="text-sm text-blue-900 font-medium hover:text-blue-700 transition-colors">
          View Profile →
        </button>
      </div>
    </div>
  </div>
);

export default CreatorCard;
