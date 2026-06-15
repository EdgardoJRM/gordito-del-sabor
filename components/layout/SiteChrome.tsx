'use client';

import { usePathname } from 'next/navigation';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import RecetarioFunnelHeader from '@/components/layout/RecetarioFunnelHeader';
import PapaEventHeader from '@/components/layout/PapaEventHeader';
import PapaLaunchStickyShell from '@/components/papa-event/PapaLaunchStickyShell';
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

function isPapaLaunchPath(pathname: string | null) {
  return pathname === '/' || isPapaEventPath(pathname);
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

  if (isPapaLaunchPath(pathname)) {
    const header =
      pathname === '/' ? (
        <NavbarWrapper pinOnScroll={false} />
      ) : (
        <PapaEventHeader />
      );

    return (
      <PapaLaunchStickyShell header={header} footer={<Footer />}>
        {children}
      </PapaLaunchStickyShell>
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
