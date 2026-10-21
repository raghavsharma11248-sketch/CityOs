import React, { createContext, useContext, useState } from 'react';

// Starting issues — yahi default data hai
const INITIAL_ISSUES = [
  { id: '#1042', title: 'Pothole on Main Street',      location: 'Downtown Sector 4',    status: 'Open',        time: '2 hours ago',   reportedBy: 'citizen' },
  { id: '#1041', title: 'Traffic Light Malfunction',   location: 'Airport Road Crossing', status: 'In Progress', time: '5 hours ago',   reportedBy: 'citizen' },
  { id: '#1040', title: 'Water Pipe Burst',             location: 'Residential Area 2',   status: 'Resolved',    time: '1 day ago',     reportedBy: 'citizen' },
  { id: '#1039', title: 'Street Light Not Working',    location: 'Sector 12 Market',      status: 'Open',        time: '2 days ago',    reportedBy: 'citizen' },
  { id: '#1038', title: 'Garbage Not Collected',       location: 'Colony Block B',        status: 'Resolved',    time: '3 days ago',    reportedBy: 'citizen' },
];

const IssuesContext = createContext(null);

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState(INITIAL_ISSUES);

  // Citizen — naya issue add karo
  const addIssue = (title, location, reportedBy = 'citizen') => {
    const newIssue = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      location,
      status: 'Open',
      time: 'Just now',
      reportedBy,
    };
    setIssues((prev) => [newIssue, ...prev]);
  };

  // Admin — issue ka status update karo
  const updateStatus = (issueId, newStatus) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  // Stats calculate karo — Admin dashboard ke liye
  const stats = {
    total:      issues.length,
    open:       issues.filter((i) => i.status === 'Open').length,
    inProgress: issues.filter((i) => i.status === 'In Progress').length,
    resolved:   issues.filter((i) => i.status === 'Resolved').length,
    percent:    Math.round((issues.filter((i) => i.status === 'Resolved').length / issues.length) * 100),
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue, updateStatus, stats }}>
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssues = () => useContext(IssuesContext);
