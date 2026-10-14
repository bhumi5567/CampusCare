import React, { useState } from 'react';
import HeroBanner from './HeroBanner.jsx';
import ComplaintsTab from './ComplaintsTab.jsx';

export default function AdminPanel({
  stats,
  complaints,
  allComplaints,
  onSelectComplaint,
  complaintStatusFilter,
  setComplaintStatusFilter,
  complaintUrgencyFilter,
  setUrgencyFilter,
  currentUser,
}) {
  const [adminSection, setAdminSection] = useState('overview'); // 'overview' | 'complaints'

  return (
    <div className="space-y-4">
      {/* Admin Panel Header */}
      <div className="bg-blue-700 rounded-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-yellow-400 text-gray-900 mb-2">
              Admin Panel
            </span>
            <h2 className="text-xl font-bold">Administrative Dashboard</h2>
            <p className="text-blue-100 text-xs mt-1">
              Welcome, <strong className="text-white">{currentUser?.name}</strong>. Manage campus complaints.
            </p>
          </div>

          {/* Admin Section Tabs */}
          <div className="flex bg-blue-900 p-1 rounded">
            <button
              onClick={() => setAdminSection('overview')}
              className={`px-3 py-1.5 rounded text-xs font-bold ${
                adminSection === 'overview'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setAdminSection('complaints')}
              className={`px-3 py-1.5 rounded text-xs font-bold ${
                adminSection === 'complaints'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              All Complaints ({stats.pendingComplaints + stats.inProgressComplaints})
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {adminSection === 'overview' && (
        <div className="space-y-4">
          <HeroBanner stats={stats} />

          {/* Recent Pending Complaints Preview */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Pending Maintenance Tickets</h3>
              <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                {stats.pendingComplaints} Pending
              </span>
            </div>
            <ComplaintsTab
              complaints={complaints.filter((c) => (c.status || '').toLowerCase() === 'pending').slice(0, 5)}
              onSelectComplaint={onSelectComplaint}
              statusFilter="pending"
              setStatusFilter={setComplaintStatusFilter}
              urgencyFilter={complaintUrgencyFilter}
              setUrgencyFilter={setUrgencyFilter}
              hideFilterBar={true}
            />
          </div>
        </div>
      )}

      {/* All Complaints Management */}
      {adminSection === 'complaints' && (
        <div className="space-y-4">
          <HeroBanner stats={stats} />
          <ComplaintsTab
            complaints={allComplaints}
            onSelectComplaint={onSelectComplaint}
            statusFilter={complaintStatusFilter}
            setStatusFilter={setComplaintStatusFilter}
            urgencyFilter={complaintUrgencyFilter}
            setUrgencyFilter={setUrgencyFilter}
          />
        </div>
      )}
    </div>
  );
}
