// app/components/NavbarContainer.tsx
"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; 

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
