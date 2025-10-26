import React from 'react';
import type { FilterType } from '../types';

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  isDisabled: boolean;
}

const filters: { name: string; value: FilterType }[] = [
  { name: 'None', value: 'none' },
  { name: 'Grayscale', value: 'grayscale' },
  { name: 'Sepia', value: 'sepia' },
  { name: 'Invert', value: 'invert' },
];

export const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, onFilterChange, isDisabled }) => {
  if (isDisabled) {
    return null; // Don't render the component if there's no edited image
  }
  
  return (
    <div className="w-full max-w-4xl p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg flex flex-col gap-4">
      <h4 className="text-lg font-semibold text-slate-300 text-center">Apply a Filter</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {filters.map(({ name, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            disabled={isDisabled}
            className={`px-4 py-3 font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-800/50 disabled:text-slate-500 ${
              activeFilter === value
                ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};