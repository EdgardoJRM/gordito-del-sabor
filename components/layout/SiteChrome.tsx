'use client';

import { usePathname } from 'next/navigation';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import RecetarioFunnelHeader from '@/components/layout/RecetarioFunnelHeader';
import PapaEventHeader from '@/components/layout/PapaEventHeader';
import FloatingEbookCTA from '@/components/ebook/FloatingEbookCTA';
import Footer from '@/components/layout/Footer';

function isRecetarioFunnelPath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === '/recetario' || pathname.startsWith('/recetario/');
}

function isPapaEventPath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === '/el-sabor-de-papa' || pathname.startsWith('/el-sabor-de-papa/');
}

function isCountdownPath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === '/delantal-proximamente';
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isCountdownPath(pathname)) {
    return <>{children}</>;
  }

  const funnel = isRecetarioFunnelPath(pathname);

  if (funnel) {
    return (
      <>
        <RecetarioFunnelHeader />
        {children}
      </>
    );
  }

  if (isPapaEventPath(pathname)) {
    return (
      <>
        <PapaEventHeader />
        {children}
        <Footer />
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
