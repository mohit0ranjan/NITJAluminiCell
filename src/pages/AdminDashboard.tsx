import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, where } from 'firebase/firestore';
import { 
  CheckCircle, 
  XCircle, 
  FileText,
  Users,
  Calendar,
  Mail,
  Download,
  Search
} from 'lucide-react';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { generateVerificationForm } from '../lib/utils';

interface Request {
  id: string;
  fullName: string;
  graduationYear: string;
  department: string;
  rollNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  purpose: string;
  currentOrganization: string;
  designation: string;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const { userRole, userDepartment, currentUser } = useAuth();

  useEffect(() => {
    if (!userRole || (userRole !== 'hod' && userRole !== 'admin')) return;

    const requestsRef = collection(db, 'requests');
    let q = query(requestsRef);

    // If user is HOD, only show requests from their department
    if (userRole === 'hod' && userDepartment) {
      q = query(requestsRef, where('department', '==', userDepartment));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Request[];
      
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userRole, userDepartment]);

  const handleUpdateStatus = async (requestId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const requestRef = doc(db, 'requests', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        updatedAt: new Date(),
        reviewedBy: currentUser?.email,
        reviewerRole: userRole,
        reviewerDepartment: userDepartment
      });

      if (newStatus === 'approved') {
        const request = requests.find(r => r.id === requestId);
        if (request) {
          generateVerificationForm({
            ...request,
            requestId: request.id
          });
        }
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pending') return request.status === 'pending' && matchesSearch;
    if (activeTab === 'approved') return request.status === 'approved' && matchesSearch;
    if (activeTab === 'rejected') return request.status === 'rejected' && matchesSearch;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    total: requests.length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userRole === 'hod' ? `${userDepartment} Department - Verification Requests` : 'All Verification Requests'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {userRole === 'hod' 
                  ? `Manage verification requests for ${userDepartment} department`
                  : 'Manage all verification requests'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['pending', 'approved', 'rejected', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Requests List */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200">
          {filteredRequests.length === 0 ? (
            <div className="p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'No requests in this category yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{request.fullName}</h3>
                      <p className="text-sm text-gray-500">
                        Submitted on {new Date(request.createdAt.toDate()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'approved')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'rejected')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {request.status}
                      </span>
                      {request.status === 'approved' && (
                        <button
                          onClick={() => generateVerificationForm({
                            ...request,
                            requestId: request.id
                          })}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Certificate
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department</p>
                      <p className="mt-1 text-sm text-gray-900">{request.department}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Roll Number</p>
                      <p className="mt-1 text-sm text-gray-900">{request.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Graduation Year</p>
                      <p className="mt-1 text-sm text-gray-900">{request.graduationYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Organization</p>
                      <p className="mt-1 text-sm text-gray-900">{request.currentOrganization}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Purpose of Verification</p>
                      <p className="mt-1 text-sm text-gray-900">{request.purpose}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;