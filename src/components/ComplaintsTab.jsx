import React from 'react';
import { CheckCircle2, Clock, Wrench, Building, User, ChevronRight, AlertCircle } from 'lucide-react';

export default function ComplaintsTab({
  complaints,
  onSelectComplaint,
  statusFilter,
  setStatusFilter,
  urgencyFilter,
  setUrgencyFilter,
  hideFilterBar = false,
}) {
  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'emergency':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
            Emergency
          </span>
        );
      case 'high':
        return (
          <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-[11px] font-semibold uppercase">
            Medium
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded text-[11px] font-medium uppercase">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return (
          <span className="flex items-center space-x-1 bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center space-x-1 bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </span>
        );
      case 'in_progress':
      case 'in-progress':
        return (
          <span className="flex items-center space-x-1 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar (Admin Panel Only) */}
      {!hideFilterBar && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
          {/* Status Pills */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded">
            {[
              { label: 'ALL', value: 'all' },
              { label: 'PENDING', value: 'pending' },
              { label: 'IN-PROGRESS', value: 'in-progress' },
              { label: 'RESOLVED', value: 'resolved' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                  statusFilter === value || (statusFilter === 'in_progress' && value === 'in-progress')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Urgency Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Urgency:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="all">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Complaints List */}
      {complaints.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <p className="text-gray-600 text-sm">No maintenance tickets found.</p>
          <p className="text-gray-400 text-xs mt-1">Submit a new complaint using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              onClick={() => onSelectComplaint(complaint)}
              className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getUrgencyBadge(complaint.urgency)}
                  <span className="text-xs text-blue-700 font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                    {complaint.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-gray-900">{complaint.title}</h3>

                <p className="text-gray-500 text-xs line-clamp-2">{complaint.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center space-x-1 text-gray-700">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>{complaint.building} — Room {complaint.roomNumber}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>{complaint.studentName}</span>
                  </span>
                  {complaint.resolutionNote && (
                    <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-100">
                      Note: {complaint.resolutionNote}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-gray-100 pt-2 md:pt-0">
                {getStatusBadge(complaint.status)}
                <span className="text-xs text-blue-600 font-semibold mt-2 flex items-center space-x-0.5">
                  <span>View Ticket</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
