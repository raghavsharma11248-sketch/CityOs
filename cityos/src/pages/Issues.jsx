import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

const Issues = () => {
  const [issuesList, setIssuesList] = useState([
    { id: '#1042', title: 'Pothole on Main Street', location: 'Downtown Sector 4', status: 'Open', time: '2 hours ago' },
    { id: '#1041', title: 'Traffic Light Malfunction', location: 'Airport Road Crossing', status: 'In Progress', time: '5 hours ago' },
    { id: '#1040', title: 'Water Pipe Burst', location: 'Residential Area 2', status: 'Resolved', time: '1 day ago' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleAddIssue = (e) => {
    e.preventDefault();
    if (title && location) {
      const newIssue = {
        id: `#10${Math.floor(Math.random() * 90 + 43)}`,
        title,
        location,
        status: 'Open',
        time: 'Just now'
      };
      setIssuesList([newIssue, ...issuesList]);
      setTitle('');
      setLocation('');
      setShowModal(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Open') return <AlertCircle className="text-brand-red" size={20} />;
    if (status === 'In Progress') return <Clock className="text-brand-yellow" size={20} />;
    if (status === 'Resolved') return <CheckCircle className="text-brand-green" size={20} />;
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'text-brand-red bg-brand-red/10 border-brand-red/20';
    if (status === 'In Progress') return 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20';
    if (status === 'Resolved') return 'text-brand-green bg-brand-green/10 border-brand-green/20';
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Civic Issues Tracker</h1>
          <p className="text-gray-400 mt-1">Monitor and report citizen issues in real-time.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-blue hover:bg-brand-blue/80 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
        >
          + New Ticket
        </button>
      </header>

      {/* Issues Table */}
      <div className="bg-dark-card rounded-xl border border-dark-border shadow-lg overflow-hidden">
        <div className="p-6 border-b border-dark-border">
          <h2 className="text-xl font-bold">Recent Reports ({issuesList.length})</h2>
        </div>
        
        <div className="divide-y divide-dark-border">
          {issuesList.map((issue, index) => (
            <div key={index} className="p-6 hover:bg-white/5 transition-colors flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(issue.status)}</div>
                <div>
                  <h3 className="font-bold text-lg">{issue.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{issue.location} • Reported {issue.time}</p>
                  <p className="text-gray-500 text-xs mt-1">Ticket ID: {issue.id}</p>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding issue */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded-xl border border-dark-border w-96 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Create New Report</h2>
            <form onSubmit={handleAddIssue} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Issue Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Street Light Broken"
                  className="w-full bg-[#0B0F19] border border-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Location</label>
                <input 
                  type="text" 
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sector 12 Market"
                  className="w-full bg-[#0B0F19] border border-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-blue"
                />
              </div>
              <button type="submit" className="w-full bg-brand-blue py-2 rounded-lg font-medium text-white hover:bg-brand-blue/80 transition-colors mt-2">
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