// Create a new file src/api.js
const API_BASE_URL = 'https://student-job-tracker-backend-q5xs.onrender.com/api';

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
  return await response.json();
};

export const updateJobStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return await response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};