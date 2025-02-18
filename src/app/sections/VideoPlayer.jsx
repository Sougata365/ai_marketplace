"use client";
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { baseURL } from "../urls";
import axios from "axios";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackVideoClick = async (videoName) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/traction/create-video-imperssion`,
        { video: videoName }
      );
      console.log("Impression tracked:", response.data);
    } catch (error) {
      console.error("Error tracking impression:", error);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    trackVideoClick("Real Estate Video");
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

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
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light text-blue-900 tracking-tight">
              Transform Your Workflow
            </h2>
            <p className="text-lg text-blue-600 leading-relaxed">
              Experience the power of AI-driven automation that streamlines your
              real estate operations. Our intelligent assistant handles the
              complexities while you focus on what matters most - growing your
              business.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-blue-800">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Automated document processing</span>
              </li>
              <li className="flex items-center space-x-3 text-blue-800">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Intelligent market analysis</span>
              </li>
              <li className="flex items-center space-x-3 text-blue-800">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>24/7 client communication</span>
              </li>
            </ul>
          </div>
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg backdrop-blur-sm bg-white/10">
              <video
                className="w-full h-full object-cover rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
              >
                <source src="/dummy.mp4" type="video/mp4" />
                <source src="/dummy.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
              <div className="h-full bg-blue-400 w-0 group-hover:w-full transition-all duration-[20000ms] ease-linear" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
