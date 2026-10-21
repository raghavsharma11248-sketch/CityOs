import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssuesContext';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved'];

const Issues = ({ darkMode }) => {
  const { user } = useAuth();
  const { issues, addIssue, updateStatus, stats } = useIssues();
  const isAdmin = user?.role === 'admin';

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle]         = useState('');
  const [location, setLocation]   = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null); // issue id jiska dropdown open hai

  const card = darkMode
    ? 'bg-[#1A2235] border-[#2A3441] text-white'
    : 'bg-white border-gray-200 text-gray-900';

  const handleAdd = (e) => {
    e.preventDefault();
    if (title && location) {
      addIssue(title, location);
      setTitle('');
      setLocation('');
      setShowModal(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Open')        return <AlertCircle className="text-red-400" size={20} />;
    if (status === 'In Progress') return <Clock className="text-yellow-400" size={20} />;
    if (status === 'Resolved')    return <CheckCircle className="text-green-400" size={20} />;
  };

  const getStatusBadge = (status) => {
    if (status === 'Open')        return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (status === 'In Progress') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    if (status === 'Resolved')    return 'text-green-400 bg-green-500/10 border-green-500/20';
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Civic Issues Tracker</h1>
          <p className="text-gray-400 mt-1">
            {isAdmin
              ? 'Monitor, manage and resolve citizen-reported issues.'
              : 'View city issues and report new ones.'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
        >
          + New Ticket
        </button>
      </header>

      {/* ── Admin only: Stats Cards ── */}
      {isAdmin && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${card} p-5 rounded-xl border shadow-lg`}>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
            <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
          </div>
          <div className={`${card} p-5 rounded-xl border shadow-lg`}>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Open</p>
            <p className="text-3xl font-bold text-red-400">{stats.open}</p>
          </div>
          <div className={`${card} p-5 rounded-xl border shadow-lg`}>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">In Progress</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.inProgress}</p>
          </div>
          <div className={`${card} p-5 rounded-xl border shadow-lg`}>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Resolved</p>
            <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
          </div>

          {/* Progress bar */}
          <div className={`col-span-2 md:col-span-4 ${card} p-5 rounded-xl border shadow-lg`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold">Overall Resolution Progress</span>
              <span className="text-green-400 font-bold">{stats.percent}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{stats.resolved} out of {stats.total} issues resolved</p>
          </div>
        </div>
      )}

      {/* ── Issues List ── */}
      <div className={`${card} rounded-xl border shadow-lg overflow-hidden`}>
        <div className={`p-6 border-b ${darkMode ? 'border-[#2A3441]' : 'border-gray-200'}`}>
          <h2 className="text-xl font-bold">Recent Reports ({issues.length})</h2>
        </div>

        <div className={`divide-y ${darkMode ? 'divide-[#2A3441]' : 'divide-gray-200'}`}>
          {issues.map((issue) => (
            <div key={issue.id} className="p-6 hover:bg-white/5 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(issue.status)}</div>
                <div>
                  <h3 className="font-bold text-lg">{issue.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{issue.location} • Reported {issue.time}</p>
                  <p className="text-gray-500 text-xs mt-1">Ticket ID: {issue.id}</p>
                </div>
              </div>

              {/* Admin: dropdown to change status | Citizen: just badge */}
              {isAdmin ? (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === issue.id ? null : issue.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${getStatusBadge(issue.status)}`}
                  >
                    {issue.status}
                    <ChevronDown size={14} />
                  </button>
                  {dropdownOpen === issue.id && (
                    <div className={`absolute right-0 mt-1 w-40 rounded-xl border shadow-2xl z-20 overflow-hidden ${
                      darkMode ? 'bg-[#1A2235] border-[#2A3441]' : 'bg-white border-gray-200'
                    }`}>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => { updateStatus(issue.id, s); setDropdownOpen(null); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/5 ${
                            issue.status === s ? 'text-blue-400 font-bold' : 'text-gray-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(issue.status)}`}>
                  {issue.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Report Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className={`${card} p-6 rounded-xl border w-96 relative shadow-2xl`}>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Report New Issue</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Issue Title</label>
                <input
                  type="text" required value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Street Light Broken"
                  className="w-full bg-[#0B0F19] border border-[#2A3441] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Location</label>
                <input
                  type="text" required value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sector 12 Market"
                  className="w-full bg-[#0B0F19] border border-[#2A3441] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 py-2 rounded-lg font-medium text-white hover:bg-blue-500 transition-colors mt-2">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;
