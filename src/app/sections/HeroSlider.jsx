"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Build Once. Earn Forever.",
      subtitle:
        "Join the leading marketplace for AI agents. Turn your expertise into recurring revenue.",
      cta: "Start Creating Today",
      ctaLink: "#",
    },
    {
      title: "Transform Your Business with AI",
      subtitle:
        "Access premium AI agents built by experts. Automate and scale with verified solutions.",
      cta: "Explore Agents",
      ctaLink: "all-agents",
    },
    {
      title: "Join Our Creator Community",
      subtitle:
        "Connect with AI experts, share knowledge, and build the future together.",
      cta: "Join Community",
      ctaLink: "#",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-white to-blue-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full h-full opacity-20"
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
        <svg
          className="absolute w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="15"
            x2="100"
            y2="15"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-blue-400"
          >
            <animate
              attributeName="y1"
              from="15"
              to="16"
              dur="3s"
              repeatCount="indefinite"
              values="15; 16; 15"
            />
            <animate
              attributeName="y2"
              from="15"
              to="14"
              dur="3s"
              repeatCount="indefinite"
              values="15; 14; 15"
            />
          </line>
        </svg>
      </div>
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-blue-600" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm transition-all hover:shadow-md"
        >
          <ArrowRight className="h-5 w-5 text-blue-600" />
        </button>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-light text-blue-900 mb-6 transition-all duration-500 tracking-tight">
            {slide.title}
          </h1>
          <p className="text-lg text-blue-600 mb-8 transition-all duration-500 leading-relaxed font-medium">
            {slide.subtitle}
          </p>
          <Link
            href={slide.ctaLink}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-sm font-medium tracking-wide"
          >
            {slide.cta}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-1 bg-blue-600"
                : "w-2 h-1 bg-blue-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
