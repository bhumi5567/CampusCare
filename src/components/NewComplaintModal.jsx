import React, { useState, useEffect } from 'react';
import { X, Wrench, Upload, Check } from 'lucide-react';
import { api } from '../lib/api';

const BUILDINGS = [
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

export default function NewComplaintModal({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plumbing', // must match backend enum exactly
    building: 'AB-1',
    roomNumber: '',
    description: '',
    urgency: 'medium',
    imageUrl: '',
    studentName: currentUser?.name || '',
    studentEmail: currentUser?.email || '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData((prev) => ({
        ...prev,
        studentName: prev.studentName || currentUser.name || '',
        studentEmail: prev.studentEmail || currentUser.email || '',
      }));
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result;
        const res = await api.upload(base64);
        setFormData((prev) => ({ ...prev, imageUrl: res.url }));
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.complaints.create(formData);
      onSuccess(res.complaint);
      setFormData({
        title: '',
        category: 'Plumbing',
        building: 'AB-1',
        roomNumber: '',
        description: '',
        urgency: 'medium',
        imageUrl: '',
        studentName: currentUser?.name || '',
        studentEmail: currentUser?.email || '',
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit complaint.');
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
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-indigo-600" />
            <span>File Maintenance Ticket</span>
          </h2>
          <p className="text-xs text-slate-500">Report repairs needed in academic blocks or campus rooms</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Leaking Bathroom Tap or AC Fan Malfunction"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              >
                {['Plumbing', 'Electrical', 'Furniture', 'Appliance', 'Internet/Wi-Fi', 'Cleanliness', 'Others'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency Level *</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="emergency">🚨 Emergency</option>
              </select>
            </div>
          </div>

          {/* Building & Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Building *</label>
              <select
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              >
                {BUILDINGS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Room / Exact Location *</label>
              <input
                type="text"
                required
                placeholder="e.g. Room 304 B or Lab 102"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Explain the maintenance issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Photo (Optional)</label>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-xl text-xs text-slate-700 font-medium cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {formData.imageUrl && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Photo Attached</span>
                </span>
              )}
            </div>
          </div>

          {/* Reporter Details */}
          <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student / Reporter Name *</label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Email *</label>
              <input
                type="email"
                required
                placeholder="student@campus.edu"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            {loading ? 'Submitting Ticket...' : 'File Maintenance Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
}
