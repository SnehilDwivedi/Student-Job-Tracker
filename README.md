# 🚀 Student Job Tracker
A full-stack MERN application to help students track their job applications with features for adding, updating, and managing applications.



## ✨ Features

- **Job Application Management**:
  - Add new job applications with company details, role, status, and date
  - Update application status (Applied → Interview → Offer → Rejected)
  - Delete applications
  - Filter applications by status and date range

- **Interactive Chatbot Assistant**:
  - Get skill requirements for different tech/non-tech roles
  - Simple conversation interface
  - Quick access to role-specific requirements

- **Full-stack Architecture**:
  - React frontend with modern UI
  - Node.js/Express backend
  - MongoDB Atlas for cloud database
  - REST API for all operations




## 🛠️ Tech Stack

**Frontend**:
- React.js with Hooks
- Vite (Frontend Tooling)
- CSS3 (Styled Components)

**Backend**:
- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)

**Deployment**:
- Vercel (Frontend)
- Render (Backend)





## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for database)
- Git

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/student-job-tracker.git
   cd student-job-tracker



1) Install dependencies:
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install




2) Environment Setup:
Create a .env file in the server directory with:
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000



3) Run the application:
# Start backend server
cd server
npm start
# Start frontend (in another terminal)
cd client
npm run dev





🌐 Deployment
The application is configured for easy deployment:
Frontend: Deploy to Vercel
Backend: Deploy to Render/Railway
Database: MongoDB Atlas
Deploy with Vercel





📸 Screenshots
Application Dashboard
![Screenshot 2025-04-10 165316](https://github.com/user-attachments/assets/fb16bac1-cbc8-408f-98fa-845bcd3d8a04)
Sample Job Added
![Screenshot 2025-04-10 165328](https://github.com/user-attachments/assets/da7127a0-2e7e-459a-9503-05b3fba3859a)
Job Requirement Bot
![Screenshot 2025-04-10 165352](https://github.com/user-attachments/assets/cb66d01c-b74d-4ad6-afc7-7568d6b2a68d)




🤖 Chatbot Features
The integrated Job Requirements Bot helps students:
Discover required skills for specific roles
Explore both tech and non-tech career paths
Get quick reference for interview preparation





🛠️ Project Structure
student-job-tracker/
├── client/               # Frontend React application
│   ├── public/           # Static files
│   ├── src/              # React components
│   └── vite.config.js    # Vite configuration
├── server/               # Backend Node.js server
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
└── README.md             # Project documentation




📝 Future Enhancements
User authentication
Application analytics dashboard
Email reminders for follow-ups
Resume tracking integration




🤝 Contributing
Contributions are welcome! Please follow these steps:
Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
