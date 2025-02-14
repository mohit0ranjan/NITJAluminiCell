import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  GraduationCap,
  Bell,
  HelpCircle,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout, userRole, userDepartment } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      show: true,
    },
    {
      title: 'New Request',
      icon: FileText,
      path: '/request',
      show: userRole === 'alumni',
    },
    {
      title: userRole === 'hod' ? `${userDepartment} Requests` : 'Admin Panel',
      icon: Settings,
      path: '/admin',
      show: userRole === 'admin' || userRole === 'hod',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-3" onClick={handleLinkClick}>
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">NITJ Alumni</span>
            </Link>
            {isMobile && (
              <button onClick={onClose} className="lg:hidden">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => 
              item.show && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg transition-colors",
                    location.pathname === item.path 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              )
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div 
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={handleLinkClick}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </div>
            <div 
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={handleLinkClick}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </div>
            <div 
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={handleLinkClick}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-600 w-full hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;