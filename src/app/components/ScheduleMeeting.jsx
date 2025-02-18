"use client";
import axios from "axios";
import {
  ArrowRight,
  Building2,
  Calendar,
  CircleHelp,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { baseURL } from "../urls";

export const ScheduleMeetingModal = ({ isOpen, onClose, mode, user }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    desc: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        customerName: user.name || user.displayName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/users/scheduleMeeting`, formData);
      if (mode === "buy") {
        router.push("https://www.fiverr.com/s/420erVl");
      } else {
        toast.success("Meeting Scheduled!");
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all max-md:h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {mode === "buy"
                    ? "Complete Purchase"
                    : "Schedule Consultation"}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                  {mode === "buy"
                    ? "Fill in your details to proceed with the purchase"
                    : "Book a personalized meeting with our team"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-5">
              <div className="relative">
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50/30 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50/30 placeholder-gray-400"
                    placeholder="Enter company name"
                  />
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50/30 placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50/30 placeholder-gray-400"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Query
              </label>
              <div className="relative">
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  rows={4}
                  className="pl-4 pr-10 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50/30 placeholder-gray-400 resize-none"
                  placeholder="Describe your requirements or questions..."
                />
                <CircleHelp className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              <p className="mt-1.5 text-sm text-gray-500">
                Feel free to provide any specific details or questions you'd
                like us to address.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {mode === "buy" ? "Complete Purchase" : "Schedule Meeting"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
