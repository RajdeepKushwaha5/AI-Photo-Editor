import React, { useRef, useState } from 'react';
import { UploadCloud } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl shadow-lg mt-10 transition-all duration-300">
        <label
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full flex flex-col items-center justify-center text-center p-6 sm:p-10 rounded-xl cursor-pointer transition-all duration-300 ${isDragging ? 'bg-slate-700 scale-105' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            <UploadCloud className="w-16 h-16 text-slate-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-bold text-slate-200">Click to upload or drag & drop</h2>
            <p className="text-slate-400 mt-2">PNG, JPG, or WEBP</p>
      </label>
    </div>
  );
};