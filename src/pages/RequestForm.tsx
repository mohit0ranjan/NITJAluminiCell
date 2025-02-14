import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Loader, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { generateVerificationForm } from '../lib/utils';

// Department options with exact IDs
const departments = [
  { id: 'cse', name: 'Computer Science' },
  { id: 'ee', name: 'Electrical Engineering' }
];

const RequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasExistingRequest, setHasExistingRequest] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    graduationYear: '',
    department: '',
    departmentId: '',
    rollNumber: '',
    purpose: '',
    currentOrganization: '',
    designation: ''
  });

  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!currentUser) return;

      const requestsRef = collection(db, 'requests');
      const q = query(requestsRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasExistingRequest(true);
        setSubmittedRequest({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
      }
    };

    checkExistingRequest();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'department') {
      const selectedDept = departments.find(dept => dept.id === value);
      setFormData(prev => ({
        ...prev,
        department: selectedDept?.name || '',
        departmentId: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || hasExistingRequest) return;

    try {
      setLoading(true);
      setError('');

      if (!formData.departmentId) {
        throw new Error('Please select a department');
      }

      const requestData = {
        ...formData,
        userId: currentUser.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
        type: 'Alumni',
        userEmail: currentUser.email
      };

      const docRef = await addDoc(collection(db, 'requests'), requestData);
      const newRequest = { id: docRef.id, ...requestData };
      setSubmittedRequest(newRequest);
      setHasExistingRequest(true);

      // Generate PDF after successful submission
      generateVerificationForm({
        ...formData,
        requestId: docRef.id
      });
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Error submitting request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (submittedRequest) {
      generateVerificationForm({
        ...submittedRequest,
        requestId: submittedRequest.id
      });
    }
  };

  if (hasExistingRequest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Request Already Exists</h2>
            <p className="mt-2 text-gray-600">
              You have already submitted a verification request. You can download your verification form or return to the dashboard.
            </p>
            <div className="mt-6 space-y-3">
              <button
                onClick={handleDownloadPDF}
                className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Verification Form
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <h1 className="text-2xl font-bold">Alumni Certificate Request</h1>
            <p className="mt-2 text-indigo-100">
              Please fill in your details to request your alumni verification certificate
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    required
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Enter your roll number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    required
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Year of graduation"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.departmentId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  >
                    <option value="">Select your department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="currentOrganization" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Organization
                  </label>
                  <input
                    type="text"
                    id="currentOrganization"
                    name="currentOrganization"
                    required
                    value={formData.currentOrganization}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Where do you work?"
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                    placeholder="Your current role"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Verification
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  placeholder="Please describe why you need this verification..."
                />
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;