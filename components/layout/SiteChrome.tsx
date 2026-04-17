'use client';

import { usePathname } from 'next/navigation';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import RecetarioFunnelHeader from '@/components/layout/RecetarioFunnelHeader';
import FloatingEbookCTA from '@/components/ebook/FloatingEbookCTA';
import Footer from '@/components/layout/Footer';

function isRecetarioFunnelPath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === '/recetario' || pathname.startsWith('/recetario/');
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const funnel = isRecetarioFunnelPath(pathname);

  if (funnel) {
    return (
      <>
        <RecetarioFunnelHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <NavbarWrapper />
      <FloatingEbookCTA />
      {children}
      <Footer />
    </>
  );
}
