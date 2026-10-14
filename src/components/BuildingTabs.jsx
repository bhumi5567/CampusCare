import React from 'react';

const BUILDINGS = [
  'All',
  'AB-1',
  'AB-2',
  'AB-3',
  'AB-4',
  'AB-5',
  'AB-6',
  'AB-7',
  'AB-8',
  'AB-9',
  'AB-10',
  'AB-11',
  'AB-12',
  'Library',
];

export default function BuildingTabs({ selectedBuilding, onSelectBuilding }) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 no-scrollbar">
      {BUILDINGS.map((building) => (
        <button
          key={building}
          onClick={() => onSelectBuilding(building)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedBuilding === building
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          {building}
        </button>
      ))}
    </div>
  );
}
