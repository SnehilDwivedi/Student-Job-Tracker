import { useState } from 'react';
import './Chatbot.css';

const roleSkills = {
  'Tech': {
    'Software Engineer': ['JavaScript/TypeScript', 'Data Structures & Algorithms', 'System Design', 'Version Control (Git)', 'Testing/Debugging'],
    'Frontend Developer': ['HTML/CSS', 'JavaScript/TypeScript', 'React/Angular/Vue', 'Responsive Design', 'State Management'],
    'Backend Developer': ['Node.js/Python/Java', 'Database Management', 'API Design', 'Authentication', 'Cloud Services'],
    'Data Scientist': ['Python/R', 'Machine Learning', 'Data Visualization', 'Statistical Analysis', 'SQL'],
    'DevOps Engineer': ['CI/CD Pipelines', 'Cloud Platforms (AWS/Azure/GCP)', 'Containerization (Docker)', 'Infrastructure as Code', 'Monitoring'],
    'QA Engineer': ['Test Automation', 'Manual Testing', 'Bug Tracking', 'Performance Testing', 'Security Testing']
  },
  'Non-Tech': {
    'Business Developer': ['Market Research', 'Sales Strategies', 'Client Relationship Management', 'Negotiation', 'Financial Analysis'],
    'Sales Associate': ['Product Knowledge', 'Customer Service', 'CRM Software', 'Communication Skills', 'Closing Techniques'],
    'Marketing Manager': ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Analytics', 'Brand Management'],
    'HR Executive': ['Recruitment', 'Employee Relations', 'Performance Management', 'Labor Laws', 'Training & Development'],
    'Operations Manager': ['Process Improvement', 'Supply Chain Management', 'Project Management', 'Budgeting', 'Team Leadership'],
    'Recruiter': ['Talent Acquisition', 'Interviewing', 'Employer Branding', 'Candidate Assessment', 'Networking']
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showFinalSkills, setShowFinalSkills] = useState(false);
  const [currentSkills, setCurrentSkills] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedRole('');
    setShowFinalSkills(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentSkills(roleSkills[selectedCategory][role]);
    setShowFinalSkills(true);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedRole('');
    setShowFinalSkills(false);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="chatbot-icon">JRT</div>
        <div className="chatbot-title">Job Requirement Bot</div>
      </div>
      
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-messages">
            {!showFinalSkills ? (
              <>
                {!selectedCategory ? (
                  <>
                    <div className="message bot question">
                      What would you like to know about? Select a category:
                    </div>
                    <div className="category-buttons">
                      <button onClick={() => handleCategorySelect('Tech')}>Tech Roles</button>
                      <button onClick={() => handleCategorySelect('Non-Tech')}>Non-Tech Roles</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="message bot info">
                      Select a specific {selectedCategory} role:
                    </div>
                    <div className="role-buttons">
                      {Object.keys(roleSkills[selectedCategory]).map(role => (
                        <button key={role} onClick={() => handleRoleSelect(role)}>
                          {role}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="message bot header">
                  For {selectedRole}, the key skills are:
                </div>
                <div className="message bot skills">
                  {currentSkills.map((skill, index) => (
                    <p key={index}>• {skill}</p>
                  ))}
                </div>
                <button className="reset-btn" onClick={handleReset}>
                  Back to Categories
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;