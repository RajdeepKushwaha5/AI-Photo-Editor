
import React from 'react';
import { Download } from './Icons';

interface DownloadButtonProps {
  imageUrl: string | null;
  isDisabled: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, isDisabled }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `edited-photo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
    >
      <Download className="w-5 h-5" />
      Download
    </button>
  );
};