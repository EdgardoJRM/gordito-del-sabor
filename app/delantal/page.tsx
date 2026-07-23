import { redirect } from 'next/navigation';
import { papaProductSlug } from '@/lib/papa-event';

export default function DelantalPage() {
  redirect(papaProductSlug);
}
