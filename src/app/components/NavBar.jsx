"use client";
import Link from "next/link";
import React, { useState } from "react";
import EnquiryFormModal from "./EnquiryForm";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <nav className="bg-white backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link
                href={"/"}
                className="flex-shrink-0 transition-transform hover:scale-105"
              >
                <img src="/logo.png" alt="logo" className="w-auto h-12" />
              </Link>
              <div className="hidden md:block ml-12">
                <div className="flex space-x-8">
                  {["Browse Agents", "Sell Agents", "Community"].map(
                    (item, index) => (
                      <Link
                        key={item}
                        href={index === 0 ? "all-agents" : "#"}
                        className="text-blue-600 hover:text-blue-900 transition-colors text-sm tracking-wide font-medium"
                      >
                        {item}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-sm tracking-wide"
              >
                Become a Creator
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal portal to body */}
      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NavBar;
