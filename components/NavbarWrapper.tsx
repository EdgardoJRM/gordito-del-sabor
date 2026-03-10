'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // No mostrar navbar en la página de inicio (que tiene su propio navbar premium)
  if (pathname === '/') {
    return null;
  }
  
  return <Navbar />;
}
