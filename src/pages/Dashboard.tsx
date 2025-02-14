import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Bell, 
  FileText,
  Users,
  Calendar,
  Globe2,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Building2,
  ExternalLink,
  Download,
  Mail
} from 'lucide-react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { generateVerificationForm } from '../lib/utils';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Alumni Meet 2025',
      description: 'Registration now open for the grand reunion',
      type: 'event',
      date: '2025-03-15',
      link: 'https://alumni.nitj.ac.in/events/meet-2025'
    },
    {
      id: 2,
      title: 'New Job Opportunities',
      description: 'Senior positions available at top tech companies',
      type: 'job',
      date: '2025-02-28',
      link: 'https://alumni.nitj.ac.in/jobs'
    },
    {
      id: 3,
      title: 'Mentorship Program',
      description: 'Share your experience with current students',
      type: 'mentorship',
      date: '2025-02-20',
      link: 'https://alumni.nitj.ac.in/mentorship'
    }
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }, [currentUser]);

  const stats = [
    { label: 'Alumni Network', value: '10,000+', icon: Users, color: 'bg-blue-500' },
    { label: 'Events This Year', value: '24', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Job Opportunities', value: '150+', icon: Briefcase, color: 'bg-green-500' },
    { label: 'Countries', value: '45+', icon: Globe2, color: 'bg-orange-500' }
  ];

  const quickActions = [
    {
      title: 'Request Certificate',
      description: 'Get your alumni verification',
      icon: FileText,
      link: '/request',
      color: 'bg-indigo-100 text-indigo-600',
      action: () => navigate('/request')
    },
    {
      title: 'Join Mentorship',
      description: 'Guide current students',
      icon: Users,
      link: '#',
      color: 'bg-purple-100 text-purple-600',
      action: () => window.open('https://alumni.nitj.ac.in/mentorship', '_blank')
    },
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: Award,
      link: '#',
      color: 'bg-blue-100 text-blue-600',
      action: () => navigate('/profile')
    }
  ];

  const handleDownloadCertificate = async () => {
    if (!currentUser || !userData) return;
    
    try {
      // Generate certificate with user data
      generateVerificationForm({
        fullName: userData.fullName,
        rollNumber: userData.rollNumber || 'N/A',
        graduationYear: userData.graduationYear || 'N/A',
        department: userData.department || 'N/A',
        currentOrganization: userData.currentOrganization || 'N/A',
        designation: userData.designation || 'N/A',
        purpose: 'Alumni Verification',
        requestId: currentUser.uid
      });
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:alumni.support@nitj.ac.in';
  };

  const handleNotificationClick = (link: string) => {
    window.open(link, '_blank');
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const resources = [
    { 
      title: 'Alumni Directory',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-600',
      action: () => window.open('https://alumni.nitj.ac.in/directory', '_blank')
    },
    { 
      title: 'Career Services',
      icon: Briefcase,
      color: 'bg-green-100 text-green-600',
      action: () => window.open('https://alumni.nitj.ac.in/careers', '_blank')
    },
    { 
      title: 'Campus News',
      icon: Building2,
      color: 'bg-purple-100 text-purple-600',
      action: () => window.open('https://alumni.nitj.ac.in/news', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
                Welcome back, {userData?.fullName || 'Alumni'}
              </h1>
              <p className="mt-1 text-gray-500">Access your alumni dashboard and stay connected</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDownloadCertificate}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </button>
              <button
                onClick={handleContactSupport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center p-6 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  {
                    title: 'Profile Updated',
                    description: 'You updated your work experience',
                    icon: TrendingUp,
                    timestamp: '2 hours ago',
                    color: 'bg-green-100 text-green-600'
                  },
                  {
                    title: 'Certificate Downloaded',
                    description: 'You downloaded your verification certificate',
                    icon: Download,
                    timestamp: '1 day ago',
                    color: 'bg-blue-100 text-blue-600'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-6">
                    <div className={`p-3 rounded-lg ${activity.color}`}>
                      <activity.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleNotificationClick(notification.link)}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'event' ? 'bg-purple-100 text-purple-600' :
                        notification.type === 'job' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {notification.type === 'event' ? <Calendar className="h-5 w-5" /> :
                         notification.type === 'job' ? <Briefcase className="h-5 w-5" /> :
                         <Users className="h-5 w-5" />}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={handleViewAllNotifications}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View all notifications
                </button>
              </div>
            </div>

            {/* Resources Card */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {resources.map((resource, index) => (
                  <button
                    key={index}
                    onClick={resource.action}
                    className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${resource.color}`}>
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{resource.title}</span>
                    <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;