"use client"
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';


const Navbar: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname(); 
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const fetchNotificationCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (role === 'Super Admin') {
        const response = await axios.get('http://localhost:3001/api/requests/admin-requests', config);
        const pendingNotifications = response.data.filter((notification: { status: string }) => notification.status === 'Pending');
        setNotificationCount(pendingNotifications.length);
      }
    } catch (error) {
      //console.error('Error fetching notifications:', error.response ? error.response.data.message : 'Server error');
    }
  }, [role]);

  useEffect(() => {
    if (role === 'Super Admin') {
      fetchNotificationCount();
    }
  }, [role, fetchNotificationCount]);

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 ">
      <div className="container mx-auto flex items-center justify-between">
        {!isAuthPage && (
          <div className="relative">
          <button
  className="inline-flex items-center px-4 py-2 text-gray-800 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out text-lg"
  type="button"
  onClick={toggleDropdown} // Toggle the dropdown visibility on click
>
  Options
  <svg
    className="w-5 h-5 ml-1 -mr-1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3h6l-3 3zm0-6l3 3H9l3-3z" />
  </svg>
</button>

    
          {isOpen && (
            <ul className="relative bg-gray-800 rounded-lg shadow-lg mt-2 p-2 right-0 z-10">
              <li className="py-1 px-4 text-white">Role: {role}</li>
              {role === 'Super Admin' && (
                <li className="py-1 px-4">
                  <Link href="/rolemanagment" className="text-white hover:text-gray-400">
                    User List
                  </Link>
                </li>
              )}
              {role === 'User' && (
                <li className="py-1 px-4">
                  <Link href="/requestadmin" className="text-white hover:text-gray-400">
                    Request Admin Role
                  </Link>
                </li>
              )}
              <li className="py-1 px-4">
                <button className="text-red-500 hover:text-red-700" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
        )}

        <Link href="/home" className="text-2xl font-bold ml-4">Inventory Management</Link>

        <div className="flex space-x-4">
          <Link href="/hom" className={`text-lg ${pathname === '/home' ? 'text-blue-400' : 'hover:text-gray-400'}`}>Home</Link>
          <Link href="/products" className={`text-lg ${pathname === '/products' ? 'text-blue-400' : 'hover:text-gray-400'}`}>Products</Link>
          <Link href="/about" className={`text-lg ${pathname === '/about' ? 'text-blue-400' : 'hover:text-gray-400'}`}>About</Link>
          
          {role === 'Super Admin' && (
            <div className="relative">
              <Link href="/adminnotification" className="text-lg flex items-center hover:text-gray-400">
                <FaBell size={24} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{notificationCount}</span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
