import React from 'react';
import { Plus, User, LogOut, UserPlus } from 'lucide-react';

export default function Header({
  currentUser,
  onOpenAuth,
  onOpenNewComplaint,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-700">CampusCare</h1>
              <p className="text-[10px] text-gray-500">Problem Reporting Portal</p>
            </div>

            {currentUser?.role === 'admin' && (
              <span className="hidden md:inline-block px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300 ml-3">
                Admin
              </span>
            )}
          </div>

          {/* Action Buttons & Auth */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <>
                {currentUser.role !== 'admin' && (
                  <button
                    onClick={onOpenNewComplaint}
                    className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Complaint</span>
                  </button>
                )}

                <div className="flex items-center space-x-2 bg-gray-100 border border-gray-300 px-2 py-1 rounded">
                  <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-gray-800">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{currentUser.role}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Logout"
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center space-x-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded"
                >
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
