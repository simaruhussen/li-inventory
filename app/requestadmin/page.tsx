"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestAdmin: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [revokedAdmin, setRevokedAdmin] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchUserRoleAndRequestStatus();
  }, []);

  const fetchUserRoleAndRequestStatus = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get('http://localhost:3001/api/requests/current-role', config);
      setRole(response.data.role);
      setRevokedAdmin(response.data.revokedAdmin);
      setRequestStatus(response.data.adminRequestStatus || '');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error fetching status or role.');
    }
  };

  const handleRequestAdmin = async () => {
    setLoading(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.post('http://localhost:3001/api/requests/request-admin', {}, config);

      setMessage(response.data.message);
      fetchUserRoleAndRequestStatus();
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error requesting admin privileges.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6">Request Admin Role</h2>

      {message && <div className="p-4 mb-4 text-blue-800 bg-blue-100 rounded">{message}</div>}

      {role === 'Admin' ? (
        <div className="p-4 mb-4 text-green-800 bg-green-100 rounded">
          You are already an admin.
        </div>
      ) : revokedAdmin ? (
        <>
          <div className="p-4 mb-4 text-yellow-800 bg-yellow-100 rounded">
            Your admin rights were revoked. You may re-apply.
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
            onClick={handleRequestAdmin}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Re-apply for Admin Role'}
          </button>
        </>
      ) : (
        <>
          <div className="p-4 mb-4 text-gray-800 bg-gray-100 rounded">
            {requestStatus === 'Pending'
              ? 'Your request is pending approval.'
              : 'You can request admin privileges.'}
          </div>
          {requestStatus !== 'Pending' && (
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
              onClick={handleRequestAdmin}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Request Admin Role'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RequestAdmin;
