import React from 'react';
import { RefreshCw, Undo, Redo, Aperture, WandSparkles } from './Icons';
import { DownloadButton } from './DownloadButton';
import { PromptBuilder } from './PromptBuilder';
import type { BlurIntensity } from '../types';

interface EditControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onEdit: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  isLoading: boolean;
  isImageLoaded: boolean;
  editedImage: string | null;
  canUndo: boolean;
  canRedo: boolean;
  enhanceQuality: boolean;
  onEnhanceChange: (value: boolean) => void;
  blurIntensity: BlurIntensity;
  onBlurIntensityChange: (value: BlurIntensity) => void;
  onBlur: () => void;
}

const intensityOptions: { label: string; value: BlurIntensity }[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
];

export const EditControls: React.FC<EditControlsProps> = ({
  prompt,
  onPromptChange,
  onEdit,
  onReset,
  onUndo,
  onRedo,
  isLoading,
  isImageLoaded,
  editedImage,
  canUndo,
  canRedo,
  enhanceQuality,
  onEnhanceChange,
  blurIntensity,
  onBlurIntensityChange,
  onBlur,
}) => {
  const handleEnhanceToggle = () => {
    if (!isLoading && isImageLoaded) {
      onEnhanceChange(!enhanceQuality);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg flex flex-col gap-6">
      {/* Prompt Editing Section */}
      <div className="flex flex-col gap-4">
        <PromptBuilder
          prompt={prompt}
          onPromptChange={onPromptChange}
          isDisabled={!isImageLoaded || isLoading}
        />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <label htmlFor="enhance-toggle" className={`font-semibold transition-colors ${!isImageLoaded || isLoading ? 'text-slate-500' : 'text-slate-300'}`}>
              Enhance Quality
            </label>
            <button
              id="enhance-toggle"
              role="switch"
              aria-checked={enhanceQuality}
              onClick={handleEnhanceToggle}
              disabled={!isImageLoaded || isLoading}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed ${
                enhanceQuality ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enhanceQuality ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <button
            onClick={onEdit}
            disabled={!prompt || isLoading || !isImageLoaded}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 animate-gradient-x bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            <WandSparkles className="w-5 h-5" />
            {isLoading ? 'Generating...' : 'Apply Prompt Edit'}
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-slate-700"></div>
      
      {/* Background Blur Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-300">Background Blur</h4>
            <div className="flex items-center bg-slate-700 rounded-lg p-1">
                {intensityOptions.map(({label, value}) => (
                    <button
                        key={value}
                        onClick={() => onBlurIntensityChange(value)}
                        disabled={isLoading || !isImageLoaded}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors disabled:cursor-not-allowed ${
                            blurIntensity === value 
                            ? 'bg-blue-600 text-white shadow' 
                            : 'text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
        <button
          onClick={onBlur}
          disabled={isLoading || !isImageLoaded}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
            <Aperture className="w-5 h-5" />
            Apply Blur
        </button>
      </div>

      <div className="w-full h-px bg-slate-700"></div>

      {/* General Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={onUndo}
          disabled={!canUndo || isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:bg-slate-700/50 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          <Undo className="w-5 h-5" />
          Undo
        </button>
         <button
          onClick={onRedo}
          disabled={!canRedo || isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:bg-slate-700/50 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          <Redo className="w-5 h-5" />
          Redo
        </button>
        <DownloadButton imageUrl={editedImage} isDisabled={!editedImage || isLoading} />
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        >
            <RefreshCw className="w-5 h-5" />
          Clear & Start Over
        </button>
      </div>
    </div>
  );
};