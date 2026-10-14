import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import LandingHero from './components/LandingHero.jsx';
import ComplaintsTab from './components/ComplaintsTab.jsx';
import AuthModal from './components/AuthModal.jsx';
import NewComplaintModal from './components/NewComplaintModal.jsx';
import ComplaintDetailModal from './components/ComplaintDetailModal.jsx';
import { api } from './lib/api.js';

import AdminPanel from './components/AdminPanel.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';

export default function App() {
  // Data state
  const [complaints, setComplaints] = useState([]);

  // Filters state
  const [complaintStatusFilter, setComplaintStatusFilter] = useState('all');
  const [complaintUrgencyFilter, setComplaintUrgencyFilter] = useState('all');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // User Auth State
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user and complaints on mount
  useEffect(() => {
    fetchUser();
    fetchComplaints();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.auth.me();
      if (res.user) setCurrentUser(res.user);
    } catch (err) {
      console.log('Not logged in');
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await api.complaints.getAll();
      setComplaints(res.complaints || []);
    } catch (err) {
      console.log('Failed to fetch complaints');
    }
  };

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Helper for complaint status matching
  const matchesComplaintStatus = (status, filter) => {
    if (!filter || filter === 'all') return true;
    const s = (status || '').toLowerCase().trim();
    if (filter === 'pending') return s === 'pending';
    if (filter === 'in-progress' || filter === 'in_progress') {
      return s === 'in_progress' || s === 'in-progress';
    }
    if (filter === 'resolved') return s === 'resolved' || s === 'rejected';
    return s === filter;
  };

  // Stats for admin banner
  const stats = {
    pendingComplaints: complaints.filter((c) => (c.status || '').toLowerCase() === 'pending').length,
    inProgressComplaints: complaints.filter((c) => {
      const s = (c.status || '').toLowerCase();
      return s === 'in_progress' || s === 'in-progress';
    }).length,
    resolvedComplaints: complaints.filter((c) => {
      const s = (c.status || '').toLowerCase();
      return s === 'resolved' || s === 'rejected';
    }).length,
    totalComplaints: complaints.length,
  };

  // Filtered complaints (for admin overview — search removed)
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = matchesComplaintStatus(complaint.status, complaintStatusFilter);
    const matchesUrgency =
      complaintUrgencyFilter === 'all' ||
      (complaint.urgency || '').toLowerCase() === complaintUrgencyFilter.toLowerCase();
    return matchesStatus && matchesUrgency;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={openAuthModal}
        onOpenNewComplaint={() => {
          if (!currentUser) {
            openAuthModal('login');
            return;
          }
          setIsNewComplaintOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {currentUser ? (
          currentUser.role === 'admin' ? (
            <div id="dashboard-feeds" className="space-y-4 pt-2">
              <AdminPanel
                stats={stats}
                complaints={complaints}
                allComplaints={filteredComplaints}
                onSelectComplaint={(complaint) => setSelectedComplaint(complaint)}
                complaintStatusFilter={complaintStatusFilter}
                setComplaintStatusFilter={setComplaintStatusFilter}
                complaintUrgencyFilter={complaintUrgencyFilter}
                setUrgencyFilter={setComplaintUrgencyFilter}
                currentUser={currentUser}
              />
            </div>
          ) : (
            <div id="student-dashboard" className="space-y-4 pt-2">
              <StudentDashboard
                currentUser={currentUser}
                complaints={complaints}
                onSelectComplaint={(complaint) => setSelectedComplaint(complaint)}
                onOpenNewComplaint={() => setIsNewComplaintOpen(true)}
              />
            </div>
          )
        ) : (
          <LandingHero
            onOpenAuth={openAuthModal}
            onExplorePortal={() => openAuthModal('login')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        <p className="font-semibold text-gray-700">CampusCare — Smart Campus Problem Reporting & Resolution</p>
        <p className="mt-1 text-[11px] text-gray-400">Academic Blocks (AB-1 to AB-12) & Campus Facilities</p>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />

      <NewComplaintModal
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
        onSuccess={(newComplaint) => setComplaints([newComplaint, ...complaints])}
        currentUser={currentUser}
      />

      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onUpdateStatus={(id, status, resolutionNote) => {
          setComplaints(complaints.map((c) => (c._id === id ? { ...c, status, resolutionNote } : c)));
        }}
        currentUser={currentUser}
      />
    </div>
  );
}
