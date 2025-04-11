// src/api.js
const API_BASE_URL = 'https://student-job-tracker-hg3j.onrender.com/api';

export const getJobs = async () => {
  const response = await fetch(`${API_BASE_URL}/jobs`);
  return await response.json();
};


export const addJob = async (jobData) => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error('Failed to add job');
  return await response.json();
};

export const updateStatus = async (id, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) throw new Error('Failed to update status');
  return await response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete job');
  return await response.json();
};
