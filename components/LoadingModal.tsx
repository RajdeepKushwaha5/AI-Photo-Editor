import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your image...",
  "Consulting the digital muse...",
  "Applying creative edits...",
  "Painting with pixels...",
  "Almost there, just polishing the details...",
  "Finalizing your masterpiece..."
];

export const LoadingModal: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      aria-labelledby="loading-heading"
    >
      <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
      <h2 id="loading-heading" className="text-2xl font-bold text-white mt-8">
        AI is Working...
      </h2>
      <p className="text-slate-400 mt-2 text-lg">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};