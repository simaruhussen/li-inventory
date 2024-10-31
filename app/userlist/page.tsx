import React from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface UsersListProps {
  users: User[];
  onGrantAdmin: (userId: string) => void;
  onRevokeAdmin: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onGrantAdmin, onRevokeAdmin, onDeleteUser }) => {
  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-gray-700 font-semibold border-b">Username</th>
            <th className="p-3 text-left text-gray-700 font-semibold border-b">Email</th>
            <th className="p-3 text-left text-gray-700 font-semibold border-b">Role</th>
            <th className="p-3 text-left text-gray-700 font-semibold border-b">Admin Actions</th>
            <th className="p-3 text-left text-gray-700 font-semibold border-b">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.username}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">{user.role}</td>
              <td className="p-3 border-b">
                {user.role !== 'Super Admin' && (
                  <>
                    {user.role === 'Admin' ? (
                      <button
                        onClick={() => onRevokeAdmin(user._id)}
                        className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Revoke Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => onGrantAdmin(user._id)}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Grant Admin
                      </button>
                    )}
                  </>
                )}
              </td>
              <td className="p-3 border-b">
                {user.role !== 'Super Admin' && (
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    className="w-full px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    Delete User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
