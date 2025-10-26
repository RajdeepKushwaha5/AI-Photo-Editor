import React from 'react';
import { Camera } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-6xl text-center mb-8 md:mb-12 relative">
      <div className="inline-flex items-center gap-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
        <Camera className="w-10 h-10 sm:w-12 sm:h-12" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          AI Photo Editor
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Transform your images with a simple prompt. Upload a photo, describe your desired change, and let AI bring your vision to life.
      </p>
    </header>
  );
};