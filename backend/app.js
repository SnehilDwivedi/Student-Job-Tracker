const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs.routes');
require('dotenv').config();

const app = express();

// CORS setup - Allow Vercel frontend and local development
app.use(cors({
  origin: [
    'https://student-job-tracker-cw7feimnq-snehildwivedis-projects.vercel.app', // Vercel frontend URL
    'https://student-job-tracker-weld.vercel.app', // Vercel domain URL
    'http://localhost:5173' // Local development (Vite default port)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/jobs', jobRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
