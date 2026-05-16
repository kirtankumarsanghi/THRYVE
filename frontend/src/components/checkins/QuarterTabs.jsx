import React from 'react';

export default function QuarterTabs({ quarters, activeQuarter, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {quarters.map((quarter) => (
        <button
          key={quarter}
          onClick={() => onSelect(quarter)}
          className={`px-4 py-2 rounded-full border text-sm transition-all font-semibold ${
            activeQuarter === quarter
              ? "bg-primary/20 border-primary text-primary"
              : "bg-dark/60 border-border text-gray-400 hover:border-primary/40"
          }`}
        >
          {quarter}
        </button>
      ))}
    </div>
  );
}
