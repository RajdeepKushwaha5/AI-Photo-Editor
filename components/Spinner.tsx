
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-300">
      <div className="w-16 h-16 border-4 border-slate-500 border-t-blue-400 rounded-full animate-spin"></div>
      <p className="text-lg font-semibold">AI is working its magic...</p>
    </div>
  );
};
