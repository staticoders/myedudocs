import React, { useState, useEffect } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

// StatCard Component
// Displays a key metric with an icon, value, and description.
type StatCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: 'blue' | 'green' | 'purple' | 'orange';
};

function StatCard({ icon, value, label, bgColor }: StatCardProps) {
  const iconBgClass = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }[bgColor] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg border border-gray-100">
      <div className={`p-3 rounded-full ${iconBgClass}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
}

// ActivityFeedItem Component
// Displays a single item in the recent activity feed.
type ActivityFeedItemProps = {
  type: string;
  description: string;
  time: string;
};

function ActivityFeedItem({ type, description, time }: ActivityFeedItemProps) {
  let icon = '';
  let colorClass = '';

  switch (type) {
    case 'assignment':
      icon = '📝';
      colorClass = 'text-blue-500';
      break;
    case 'grade':
      icon = '💯';
      colorClass = 'text-green-500';
      break;
    case 'announcement':
      icon = '📣';
      colorClass = 'text-purple-500';
      break;
    case 'quiz':
      icon = '🧠';
      colorClass = 'text-orange-500';
      break;
    default:
      icon = '💡';
      colorClass = 'text-gray-500';
  }

  return (
    <div className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className={`flex-shrink-0 text-xl ${colorClass}`}>{icon}</div>
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{description}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <button className="text-purple-600 hover:text-purple-800 transition-colors duration-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// DeadlineItem Component
// Displays an upcoming deadline or event.
function DeadlineItem({ date, time, title, course }) {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0 text-center">
        <p className="text-lg font-bold text-purple-600 leading-none">{date}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{course}</p>
      </div>
      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        Due
      </span>
    </div>
  );
}

// QuickLinkCard Component
// A card for quick access to important areas.
type QuickLinkCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: 'red' | 'yellow' | 'green' | 'blue';
};

function QuickLinkCard({ title, description, icon, bgColor }: QuickLinkCardProps) {
  const bgClass = {
    red: 'bg-red-50',
    yellow: 'bg-yellow-50',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
  }[bgColor] || 'bg-gray-50';

  const textClass = {
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
  }[bgColor] || 'text-gray-600';

  return (
    <a href="#" className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${bgClass} ${textClass}`}>
      <span className="text-4xl mb-3">{icon}</span>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-center text-sm mt-1 text-gray-600">{description}</p>
    </a>
  );
}




// Main StudentDashboard Component (Student Command Center Dashboard)
function StudentDashboard() {

   useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script); // Clean up
    };
  }, []);

  // Get user from local storage
  type LoginUser = {
    name?: string;
    [key: string]: any;
  };
  const [loginUser, setLoginuser] = useState<LoginUser>({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])



  // Logout

  const Navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('edudocs')
    message.success("Logged out successfully", 7)
    Navigate('/student-login')
  }

  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in ! First Log in to your account", 7)
      Navigate('/student-login')
    }
  }, [Navigate])



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 sm:p-8 lg:p-10 font-inter antialiased flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl border border-gray-100 p-6 sm:p-8 lg:p-10">

        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              Hello, {loginUser.name}! 👋
            </h1>
            <p className="text-gray-500 text-lg">Your personalized student dashboard.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">

            <Dropdown>
              <Dropdown.Toggle
                className="px-4 py-3 rounded-pill d-flex align-items-center gap-2 stylish-dropdown-toggle"
                variant="light"
                id="dropdown-custom"
              >
                <i className="fas fa-user-circle"></i>
                <strong className="text-dark">
                  Welcome {loginUser.name ? loginUser.name : "Profile"}
                </strong>
              </Dropdown.Toggle>

              <Dropdown.Menu className="stylish-dropdown-menu">
                <Dropdown.Item href="#/profile">👤 My Profile</Dropdown.Item>
                <Dropdown.Item href="#/settings">⚙️ Settings</Dropdown.Item>
                <button onClick={logoutHandler}><i className='fa fa-right-arrow'></i> Logout</button>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>

        {/* Key Metrics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon="📚" value="5" label="Active Courses" bgColor="blue" />
          <StatCard icon="✅" value="12" label="Assignments Due" bgColor="green" />
          <StatCard icon="⭐" value="4.2" label="Current GPA" bgColor="purple" />
          <StatCard icon="⏰" value="2" label="Unread Notifications" bgColor="orange" />
        </section>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-3">
              <ActivityFeedItem
                type="grade"
                description="Received 95% on 'Introduction to AI' Quiz 3"
                time="5 mins ago"
              />
              <ActivityFeedItem
                type="assignment"
                description="Submitted 'Calculus Homework 5'"
                time="2 hours ago"
              />
              <ActivityFeedItem
                type="announcement"
                description="New announcement in 'Web Dev Basics': Lab Session Cancelled"
                time="Yesterday"
              />
              <ActivityFeedItem
                type="assignment"
                description="New assignment: 'AI Ethics Essay' posted in 'Intro to AI'"
                time="2 days ago"
              />
              <ActivityFeedItem
                type="quiz"
                description="Started 'Graphic Design Principles' Quiz 1"
                time="3 days ago"
              />
            </div>
          </section>

          {/* Upcoming & Quick Access Column */}
          <aside>
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-5">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <DeadlineItem date="28 May" time="11:59 PM" title="Calculus Homework 6" course="Advanced Calculus" />
                <DeadlineItem date="01 Jun" time="10:00 AM" title="Group Project Presentation" course="Web Development Basics" />
                <DeadlineItem date="05 Jun" time="03:00 PM" title="AI Midterm Exam" course="Introduction to AI" />
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-5">Quick Access</h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickLinkCard icon="📅" title="Calendar" description="View full schedule" bgColor="red" />
                <QuickLinkCard icon="💬" title="Messages" description="Instructor & Peers" bgColor="yellow" />
                <QuickLinkCard icon="📊" title="Grades" description="Detailed progress" bgColor="green" />
                <QuickLinkCard icon="❓" title="Help" description="Get support" bgColor="blue" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
