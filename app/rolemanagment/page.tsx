"use client"
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';
import UsersList from '../userlist/page';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const RoleManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleGrantAdmin = async (userId: string) => {
    await updateRole(userId, 'grant-admin');
  };

  const handleRevokeAdmin = async (userId: string) => {
    await updateRole(userId, 'revoke-admin');
  };

  const updateRole = async (userId: string, action: 'grant-admin' | 'revoke-admin') => {
    try {
      await axios.patch(`http://localhost:3001/api/users/${action}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`Successfully ${action === 'grant-admin' ? 'granted' : 'revoked'} admin privileges`);
      setShowPopup(true);
      fetchUsers();
    } catch (error) {
      setError(`Failed to ${action === 'grant-admin' ? 'grant' : 'revoke'} admin privileges`);
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User deleted successfully');
      setShowPopup(true);
      fetchUsers();
    } catch (error) {
      setError('Failed to delete user');
      console.error(error);
    }
  };

  const filteredUsers = users
    .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.role === 'Super Admin') return -1;
      if (b.role === 'Super Admin') return 1;
      return a.username.localeCompare(b.username);
    });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl font-bold mb-6">Role Management</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <UsersList
            users={filteredUsers}
            onGrantAdmin={handleGrantAdmin}
            onRevokeAdmin={handleRevokeAdmin}
            onDeleteUser={handleDeleteUser}
          />

          {showPopup && (
            <div className={`mt-4 ${error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} p-4 rounded`}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoleManagement;
