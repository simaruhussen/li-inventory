"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  _id: string;
  userId: {
    email: string;
  };
  status: string;
}

const AdminNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchAdminNotifications();
  }, []);

  const fetchAdminNotifications = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get('http://localhost:3001/api/requests/admin-requests', config);
      setNotifications(response.data);
    } catch (error: any) {
      setMessage(error.response ? error.response.data.message : 'Server error. Please try again.');
    }
  };

  const handleNotificationAction = async (notificationId: string, status: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.patch(
        `http://localhost:3001/api/requests/admin-requests/${notificationId}`,
        { status },
        config
      );

      setMessage(response.data.message);
      fetchAdminNotifications();
    } catch (error: any) {
      setMessage(error.response ? error.response.data.message : 'Server error. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Pending Admin Notifications</h2>

      {message && <p className="text-center mb-4 text-blue-600">{message}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-4">User Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification._id} className="border-b">
                  <td className="px-6 py-4">{notification.userId.email}</td>
                  <td className="px-6 py-4">{notification.status}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleNotificationAction(notification._id, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleNotificationAction(notification._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No pending notifications
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotification;
