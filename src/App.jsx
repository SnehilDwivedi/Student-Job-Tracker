import { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot'; // Adjust path if your folder structure is different
import { getJobs } from './api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    roleCategory: '',
    role: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0],
    link: ''
  });
  const [filter, setFilter] = useState({
    status: 'All',
    dateFrom: '',
    dateTo: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const roleOptions = {
    Tech: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'DevOps Engineer', 'QA Engineer'],
    'Non-Tech': ['Business Developer', 'Sales Associate', 'Marketing Manager', 'HR Executive', 'Operations Manager', 'Recruiter']
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await getJobs();
        setJobs(data.data); // or just setJobs(data) depending on your API response
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to load jobs. Check console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prev => ({
      ...prev,
      roleCategory: category,
      role: ''
    }));
  };

  // Add job to backend
  const addJob = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) {
      alert('Company and Role are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add job');
      
      const { data } = await response.json();
      setJobs(prev => [...prev, data]);
      resetForm();
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Check console for details.');
    }
  };

  // Update job status in backend
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      const { data } = await response.json();
      setJobs(prev => prev.map(job => 
        job._id === data._id ? data : job
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete job from backend
  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job');
      
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Check console for details.');
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      roleCategory: '',
      role: '',
      status: 'Applied',
      date: new Date().toISOString().split('T')[0],
      link: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    const statusMatch = filter.status === 'All' || job.status === filter.status;
    let dateMatch = true;
    if (filter.dateFrom && job.date < filter.dateFrom) dateMatch = false;
    if (filter.dateTo && job.date > filter.dateTo) dateMatch = false;
    return statusMatch && dateMatch;
  });

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <p>Manage your job applications in one place</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Add New Application</h2>
          <form onSubmit={addJob} className="job-form">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="roleCategory">Job Category</label>
              <select
                id="roleCategory"
                name="roleCategory"
                value={formData.roleCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Non-Tech">Non-Tech</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Job Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={!formData.roleCategory}
                required
              >
                <option value="">Select Role</option>
                {formData.roleCategory &&
                  roleOptions[formData.roleCategory].map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Application Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Application Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Job Posting Link (Optional)</label>
              <input
                type="url"
                id="link"
                name="link"
                placeholder="https://example.com/job"
                value={formData.link}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">Add Application</button>
          </form>
        </section>

        <section className="filter-section">
          <h2>Filter Applications</h2>
          <div className="filter-grid">
            <div className="filter-group">
              <label htmlFor="filter-status">Status</label>
              <select 
                id="filter-status"
                value={filter.status} 
                onChange={(e) => setFilter({...filter, status: e.target.value})}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="date-from">From Date</label>
              <input 
                type="date" 
                id="date-from"
                value={filter.dateFrom}
                onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="date-to">To Date</label>
              <input 
                type="date" 
                id="date-to"
                value={filter.dateTo}
                onChange={(e) => setFilter({...filter, dateTo: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="jobs-section">
          <div className="section-header">
            <h2>Your Applications</h2>
            <span className="job-count">{filteredJobs.length} applications</span>
          </div>
          
          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>No applications found matching your filters</p>
              <button onClick={() => setFilter({status: 'All', dateFrom: '', dateTo: ''})}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="jobs-table-container">
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job._id}>
                      <td>{job.company}</td>
                      <td>{job.role}</td>
                      <td>
                        <select
                          value={job.status}
                          onChange={(e) => updateStatus(job._id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>{new Date(job.date).toLocaleDateString()}</td>
                      <td>
                        {job.link ? (
                          <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
                            View
                          </a>
                        ) : '-'}
                      </td>
                      <td>
                        <button 
                          onClick={() => deleteJob(job._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Chatbot Component - This is the only new addition */}
      <Chatbot />
    </div>
  );
}

export default App;