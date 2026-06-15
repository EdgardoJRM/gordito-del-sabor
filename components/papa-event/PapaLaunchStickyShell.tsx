'use client';

import PapaStickyBar from '@/components/papa-event/PapaStickyBar';

type PapaLaunchStickyShellProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/** Header + barra de inventario pegados juntos al hacer scroll. */
export default function PapaLaunchStickyShell({
  header,
  children,
  footer,
}: PapaLaunchStickyShellProps) {
  return (
    <>
      <div className="sticky top-0 z-50">
        {header}
        <PapaStickyBar />
      </div>
      {children}
      {footer}
    </>
  );
}
