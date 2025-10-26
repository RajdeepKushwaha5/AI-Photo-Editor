import React from 'react';
import { WandSparkles, Trash } from './Icons';

interface PromptElement {
  label: string;
  value: string;
}

interface PromptCategory {
  name: string;
  elements: PromptElement[];
}

const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    name: 'Add Object',
    elements: [
      { label: 'Wizard Hat', value: 'a wizard hat' },
      { label: 'Sunglasses', value: 'cool sunglasses' },
      { label: 'Crown', value: 'a golden crown' },
      { label: 'Butterfly', value: 'a glowing butterfly on the shoulder' },
    ],
  },
  {
    name: 'Change Background',
    elements: [
      { label: 'Forest', value: 'a mystical forest' },
      { label: 'Beach', value: 'a tropical beach at sunset' },
      { label: 'Space', value: 'a vibrant nebula in outer space' },
      { label: 'City', value: 'a futuristic cyberpunk city' },
    ],
  },
  {
    name: 'Apply Style',
    elements: [
      { label: 'Cartoon', value: 'in a cartoon style' },
      { label: 'Watercolor', value: 'in a watercolor painting style' },
      { label: 'Pixel Art', value: 'in a pixel art style' },
      { label: 'Vintage Photo', value: 'like a vintage photograph' },
    ],
  },
  {
    name: 'Adjust Lighting',
    elements: [
      { label: 'Sunny Day', value: 'with bright, sunny day lighting' },
      { label: 'Golden Hour', value: 'with warm, golden hour lighting' },
      { label: 'Neon Glow', value: 'with dramatic neon lighting' },
      { label: 'Moonlit', value: 'under a full moon' },
    ],
  },
];

interface PromptBuilderProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  isDisabled: boolean;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ prompt, onPromptChange, isDisabled }) => {
  const handleAddElement = (elementValue: string) => {
    const separator = prompt.trim() === '' ? '' : ', ';
    onPromptChange(`${prompt}${separator}${elementValue}`);
  };

  const handleClearPrompt = () => {
    onPromptChange('');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <WandSparkles className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Describe your edit or use the buttons below..."
          className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-12 pr-12 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none"
          rows={3}
          disabled={isDisabled}
        />
        {prompt && (
          <button
            onClick={handleClearPrompt}
            className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors disabled:cursor-not-allowed"
            aria-label="Clear prompt"
            disabled={isDisabled}
          >
            <Trash className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROMPT_CATEGORIES.map((category) => (
          <div key={category.name} className="flex flex-col gap-2">
            <h5 className="font-semibold text-slate-400 text-sm px-2">{category.name}</h5>
            <div className="flex flex-col gap-2">
              {category.elements.map((element) => (
                <button
                  key={element.label}
                  onClick={() => handleAddElement(element.value)}
                  disabled={isDisabled}
                  className="w-full text-left px-3 py-2 text-sm font-medium bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition-colors disabled:bg-slate-700/50 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                  {element.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};