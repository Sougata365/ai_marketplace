"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { baseURL } from "../urls";

const EnquiryFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    useCase: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;

      return () => {
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        `${baseURL}/api/assistants/createEnquiry`,
        formData
      );
      setStatus({
        type: "success",
        message: "Thank you for your enquiry! We will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        useCase: "",
        country: "",
      });
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.error ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="bg-blue-600 text-white p-6 pr-12">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-blue-100 mt-1">Tell us about your project</p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-blue-100 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Use Case *
                    </label>
                    <textarea
                      name="useCase"
                      required
                      value={formData.useCase}
                      onChange={handleChange}
                      rows="4"
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {status.message && (
                  <div
                    className={`p-4 rounded-md ${
                      status.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
