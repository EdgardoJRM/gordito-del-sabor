import type { Metadata } from 'next';
import DelantalCountdownPage from '@/components/countdown/DelantalCountdownPage';
import { getDelantalLaunchAtIso } from '@/lib/delantal-countdown';

export const metadata: Metadata = {
  title: 'Delantal disponible pronto | El Gordito del Sabor',
  description:
    'Delantal El Gordito abre en pocas horas. Déjanos tu email y te avisamos.',
  robots: { index: false, follow: false },
};

export default function DelantalProximamentePage() {
  const launchAtIso = getDelantalLaunchAtIso();

  return <DelantalCountdownPage launchAtIso={launchAtIso} />;
}
