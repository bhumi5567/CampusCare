import React from 'react';
import {
  Compass,
  Search,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  HelpCircle,
  FileText,
  UserCheck,
  Bell,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';

export default function LandingHero({ onOpenAuth, onExplorePortal }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 py-4">
      {/* =========================================
          SCROLL SECTION 1: PROJECT OVERVIEW & PURPOSE
         ========================================= */}
      <section
        id="project-overview"
        className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border border-slate-200/80 shadow-sm p-8 sm:p-14"
      >
        {/* Soft Ambient Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-100/70 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Section 1 of 3 · Project Overview</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Centralized Campus Assistance for <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Lost Belongings</span> & <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Facility Care</span>
        </h1>

        <p className="mt-6 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          <strong>CampusCare</strong> is an integrated digital portal engineered for academic institutions. It provides a single, transparent channel for students and campus administration to report lost items and streamline facility maintenance tickets without paper logbooks or scattered chats.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Create Campus Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplorePortal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Browse Active Feeds</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('project-architecture')}
          className="mt-12 inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium transition-colors"
        >
          <span>Scroll down for Project Capabilities & Architecture</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      {/* =========================================
          SCROLL SECTION 2: SYSTEM CAPABILITIES & SPECS
         ========================================= */}
      <section
        id="project-architecture"
        className="min-h-[70vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Section 2 of 3 · Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How the Platform Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            CampusCare connects multi-building physical zones (Academic Blocks AB-1 through AB-12) with verified database tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {/* Capability 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">1. Lost & Found Hub</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Post lost or found items with location tags, category classification (Electronics, Wallets, Keys, ID Cards), photographic evidence, and reporter contact records.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct owner claiming & resolution</span>
            </div>
          </div>

          {/* Capability 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">2. Maintenance Triage</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              File electrical, plumbing, carpentry, or network tickets tagged with building and exact room numbers. Urgency classification ensures urgent hazards are addressed first.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-level priority queue & logs</span>
            </div>
          </div>

          {/* Capability 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">3. Role-Based Access</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Students can report issues and monitor progress. Campus wardens and admin staff have triage authority to update statuses (Pending, In-Progress, Resolved) with technician notes.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authenticated campus profiles</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection('usage-instructions')}
            className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium transition-colors"
          >
            <span>Scroll down for Portal Usage Instructions</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* =========================================
          SCROLL SECTION 3: STEP-BY-STEP USAGE GUIDE
         ========================================= */}
      <section
        id="usage-instructions"
        className="min-h-[70vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Section 3 of 3 · Portal Usage Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How to Use CampusCare
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Follow these 3 easy steps to navigate and resolve campus requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          {/* Step 1 */}
          <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 text-left">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              1
            </div>
            <h4 className="font-bold text-base text-slate-900">Sign Up / Authenticate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click <strong>Register</strong> or <strong>Login</strong> in the top header. Fill in your name, campus email, and select your role (Student or Admin Staff).
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 text-left">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              2
            </div>
            <h4 className="font-bold text-base text-slate-900">Select Building & Filter</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use the top Building tabs to restrict your view to a specific Academic Block (AB-1..12) or Library. Toggle between <strong>Lost & Found</strong> and <strong>Maintenance</strong> tabs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 text-left">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              3
            </div>
            <h4 className="font-bold text-base text-slate-900">Submit or Resolve</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click <strong>Report Item</strong> to publish a lost/found post or <strong>New Complaint</strong> to raise a maintenance ticket. Click any card to inspect details and track resolution status.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all"
          >
            Sign In to Start Using Portal
          </button>
          <button
            onClick={onExplorePortal}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
          >
            Go to Main Dashboard ↓
          </button>
        </div>
      </section>
    </div>
  );
}
