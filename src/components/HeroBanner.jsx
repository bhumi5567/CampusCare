import React from 'react';

export default function HeroBanner({ stats }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900">Maintenance Complaint Tracker</h2>
          <p className="text-gray-500 text-xs mt-1">
            Real-time status across all academic blocks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 font-semibold mb-1">Total</p>
            <span className="text-2xl font-bold text-gray-900">{stats.totalComplaints}</span>
            <p className="text-[10px] text-gray-400 mt-0.5">All complaints</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <p className="text-xs text-yellow-700 font-semibold mb-1">Pending</p>
            <span className="text-2xl font-bold text-gray-900">{stats.pendingComplaints}</span>
            <p className="text-[10px] text-yellow-500 mt-0.5">Awaiting action</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
            <p className="text-xs text-orange-700 font-semibold mb-1">In Progress</p>
            <span className="text-2xl font-bold text-gray-900">{stats.inProgressComplaints}</span>
            <p className="text-[10px] text-orange-500 mt-0.5">Work ongoing</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-xs text-green-700 font-semibold mb-1">Resolved</p>
            <span className="text-2xl font-bold text-gray-900">{stats.resolvedComplaints}</span>
            <p className="text-[10px] text-green-500 mt-0.5">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
