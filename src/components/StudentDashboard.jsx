import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function StudentDashboard({
  currentUser,
  complaints,
  onSelectComplaint,
  onOpenNewComplaint,
}) {
  const [activeTab, setActiveTab] = useState('my-complaints'); // 'my-complaints' | 'all-complaints'

  // Only this student's complaints
  const myComplaints = complaints.filter(
    (c) =>
      (c.studentEmail && currentUser?.email && c.studentEmail.trim().toLowerCase() === currentUser.email.trim().toLowerCase()) ||
      (c.studentName && currentUser?.name && c.studentName.trim().toLowerCase() === currentUser.name.trim().toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === 'resolved') return 'bg-green-100 text-green-700';
    if (status === 'rejected') return 'bg-red-100 text-red-700';
    if (status === 'in_progress' || status === 'in-progress') return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getStatusLabel = (status) => {
    if (status === 'in_progress') return 'In Progress';
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
  };

  const displayedComplaints = activeTab === 'my-complaints' ? myComplaints : complaints;

  const ComplaintCard = ({ c }) => (
    <div
      key={c._id}
      onClick={() => onSelectComplaint(c)}
      className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-gray-50 cursor-pointer space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
          {c.category} · {c.building} · {c.roomNumber}
        </span>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getStatusStyle(c.status)}`}>
          {getStatusLabel(c.status)}
        </span>
      </div>
      <h4 className="text-xs font-bold text-gray-900">{c.title}</h4>
      <p className="text-[11px] text-gray-500 line-clamp-1">{c.description}</p>
      {c.resolutionNote && (
        <p className="text-[11px] text-green-700 bg-green-50 p-2 rounded border border-green-100">
          Admin Remark: {c.resolutionNote}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Student Welcome Banner */}
      <div className="bg-blue-600 rounded-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block text-xs font-semibold bg-blue-500 px-2 py-0.5 rounded mb-2">
              Student Service Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              Welcome back, {currentUser?.name}!
            </h2>
            <p className="text-blue-100 text-xs mt-1">
              {currentUser?.department ? `${currentUser.department} · ` : ''}CampusCare Portal
            </p>
          </div>

          <button
            onClick={onOpenNewComplaint}
            className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm flex items-center space-x-1 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>File New Complaint</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <span className="text-2xl font-bold text-gray-900">{myComplaints.length}</span>
          <p className="text-xs text-gray-500 mt-1">My Complaints</p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-3 text-center">
          <span className="text-2xl font-bold text-yellow-700">
            {myComplaints.filter((c) => c.status === 'pending').length}
          </span>
          <p className="text-xs text-yellow-600 mt-1">Pending</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-3 text-center">
          <span className="text-2xl font-bold text-green-700">
            {myComplaints.filter((c) => c.status === 'resolved').length}
          </span>
          <p className="text-xs text-green-600 mt-1">Resolved</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('my-complaints')}
          className={`px-3 py-1.5 rounded text-xs sm:text-sm font-bold ${
            activeTab === 'my-complaints'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          My Complaints ({myComplaints.length})
        </button>
        <button
          onClick={() => setActiveTab('all-complaints')}
          className={`px-3 py-1.5 rounded text-xs sm:text-sm font-bold ${
            activeTab === 'all-complaints'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Campus Complaints ({complaints.length})
        </button>
      </div>

      {/* Complaints List */}
      <div className="space-y-3">
        {displayedComplaints.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-sm">No complaints found.</p>
            <p className="text-gray-400 text-xs mt-1">Click "File New Complaint" to report an issue.</p>
          </div>
        ) : (
          displayedComplaints.map((c) => <ComplaintCard key={c._id} c={c} />)
        )}
      </div>
    </div>
  );
}
