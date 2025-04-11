const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true,
    maxlength: 50
  },
  roleCategory: {
    type: String,
    required: [true, 'Please provide role category'],
    enum: ['Tech', 'Non-Tech']
  },
  role: {
    type: String,
    required: [true, 'Please provide job role'],
    trim: true,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  date: {
    type: Date,
    required: [true, 'Please provide application date'],
    default: Date.now
  },
  link: {
    type: String,
    trim: true,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please provide a valid URL'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);