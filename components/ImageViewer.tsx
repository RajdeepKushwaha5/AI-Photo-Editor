import React from 'react';
import { ImageIcon, Crop } from './Icons';
import type { FilterType } from '../types';

interface ImageViewerProps {
  title: string;
  imageUrl: string | null;
  onCropClick?: () => void;
  activeFilter?: FilterType;
}

const filterClasses: Record<FilterType, string> = {
    none: '',
    grayscale: 'grayscale',
    sepia: 'sepia',
    invert: 'invert',
};

export const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageUrl, onCropClick, activeFilter = 'none' }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-xl font-semibold text-slate-300 mb-4">{title}</h3>
      <div className="w-full aspect-square bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-slate-700 relative">
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={title} 
              className={`w-full h-full object-contain transition-all duration-300 ${filterClasses[activeFilter]}`} 
            />
            {onCropClick && (
              <button 
                onClick={onCropClick}
                className="absolute top-3 right-3 p-2 bg-slate-900/60 rounded-full text-white hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Crop Image"
              >
                <Crop className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-slate-500">
            <ImageIcon className="w-24 h-24 mb-4" />
            <p className="text-lg">Your image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};