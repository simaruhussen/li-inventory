// app/components/NavbarContainer.tsx
"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Assuming your Navbar component is in the same directory

const NavbarContainer = () => {
  const pathname = usePathname();
  const hideNavbarPaths = ['/login', '/register'];

  return (
    <>
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
    </>
  );
};

export default NavbarContainer;
