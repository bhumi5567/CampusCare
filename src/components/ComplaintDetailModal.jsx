import React, { useState, useEffect } from 'react';
import { X, Wrench, Building, User, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../lib/api';

export default function ComplaintDetailModal({
  complaint,
  onClose,
  onUpdateStatus,
  currentUser,
}) {
  const [resolutionNote, setResolutionNote] = useState(complaint?.resolutionNote || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResolutionNote(complaint?.resolutionNote || '');
  }, [complaint]);

  if (!complaint) return null;

  const isAdmin = currentUser?.role === 'admin';

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await api.complaints.updateStatus(complaint._id, newStatus, resolutionNote);
      onUpdateStatus(complaint._id, newStatus, resolutionNote);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-indigo-700 font-semibold mb-1">
            <Wrench className="w-4 h-4 text-indigo-600" />
            <span>Maintenance Triage Ticket</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{complaint.title}</h2>
        </div>

        {/* Image Preview */}
        {complaint.imageUrl && (
          <div className="h-48 w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
            <img src={complaint.imageUrl} alt={complaint.title} className="w-full h-full object-contain" />
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div>
            <span className="text-slate-500 font-medium">Building & Room</span>
            <p className="font-semibold text-slate-800">{complaint.building}</p>
            <p className="text-indigo-600 font-medium">Room: {complaint.roomNumber}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Category & Urgency</span>
            <p className="font-semibold text-slate-800">{complaint.category}</p>
            <p className="capitalize text-amber-700 font-medium">{complaint.urgency} Urgency</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Description</span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
            {complaint.description}
          </p>
        </div>

        {/* Student Reporter Info */}
        <div className="text-xs text-slate-600 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span>Student: <strong className="text-slate-900">{complaint.studentName}</strong></span>
          <span>Contact: <strong className="text-slate-900">{complaint.studentEmail}</strong></span>
        </div>

        {/* Admin Triage & Status Update (Full Admin Access) */}
        {isAdmin ? (
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Resolution Note / Admin Remark
              </label>
              <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 font-bold px-2 py-0.5 rounded-full">
                Admin Full Access
              </span>
            </div>
            <textarea
              rows={2}
              placeholder="Add remarks on technician assigned, repair completed..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
            />

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => handleStatusChange('pending')}
                disabled={loading}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  complaint.status === 'pending'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Mark Pending
              </button>
              <button
                onClick={() => handleStatusChange('in_progress')}
                disabled={loading}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  complaint.status === 'in_progress' || complaint.status === 'in-progress'
                    ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange('resolved')}
                disabled={loading}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  complaint.status === 'resolved' || complaint.status === 'closed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ✓ Resolved
              </button>
            </div>
          </div>
        ) : (
          complaint.resolutionNote && (
            <div className="border-t border-slate-100 pt-3">
              <span className="text-xs font-semibold text-slate-600">Admin Remarks:</span>
              <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 mt-1 font-medium">
                {complaint.resolutionNote}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
