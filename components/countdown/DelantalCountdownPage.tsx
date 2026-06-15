'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bell, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function getTimeLeft(launchMs: number): TimeLeft {
  const totalMs = Math.max(0, launchMs - Date.now());
  const totalSec = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { hours, minutes, seconds, totalMs };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

type DelantalCountdownPageProps = {
  launchAtIso: string;
};

export default function DelantalCountdownPage({ launchAtIso }: DelantalCountdownPageProps) {
  const launchMs = new Date(launchAtIso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(launchMs));
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft(launchMs);
      setTimeLeft(next);
      if (next.totalMs <= 0) {
        window.location.reload();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [launchMs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Ingresa un email válido.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source: 'delantal-reminder',
          message: `Recordatorio delantal — countdown hasta ${launchAtIso}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'No se pudo guardar tu email.');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1412] text-[#FAF8F5] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <Image
            src={siteConfig.logoPath}
            alt={siteConfig.brandName}
            width={112}
            height={112}
            className="h-24 w-24 md:h-28 md:w-28 mx-auto mb-10 object-contain"
            priority
          />

          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">Edición El Sabor de Papá</p>
          <h1 className="heading-section-comfort text-[#FAF8F5] mb-4">
            El delantal abre en
          </h1>
          <p className="text-xl text-[#C4B8AE] mb-10 leading-relaxed">
            Estamos preparando todo para que ordenes con calma. En unas horas podrás personalizar el
            bordado y pagar seguro.
          </p>

          <div
            className="grid grid-cols-3 gap-3 md:gap-6 mb-12"
            role="timer"
            aria-live="polite"
            aria-label="Tiempo restante para abrir ventas del delantal"
          >
            {[
              { label: 'Horas', value: pad(timeLeft.hours) },
              { label: 'Minutos', value: pad(timeLeft.minutes) },
              { label: 'Segundos', value: pad(timeLeft.seconds) },
            ].map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl border-2 border-[#C4472B]/40 bg-[#2D2220] py-6 md:py-8"
              >
                <p className="text-4xl md:text-6xl font-bold text-[#FAF8F5] tabular-nums">
                  {unit.value}
                </p>
                <p className="text-sm md:text-base text-[#C4B8AE] mt-2 font-bold uppercase tracking-wide">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border-2 border-[#E8E0D8]/20 bg-[#2D2220]/80 p-8 md:p-10 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-[#C4472B]" size={28} aria-hidden />
              <h2 className="text-xl md:text-2xl font-bold text-[#FAF8F5]">
                Avísame cuando abra
              </h2>
            </div>
            <p className="body-text text-lg text-[#C4B8AE] mb-6">
              Pon tu email y te mandamos un recordatorio en cuanto puedas ordenar tu delantal.
            </p>

            {status === 'success' ? (
              <p className="text-lg font-bold text-[#E8D4BC] text-center py-4" role="status">
                Listo — te avisamos cuando abra. Esto es bello.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="countdown-email" className="sr-only">
                  Tu email
                </label>
                <input
                  id="countdown-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="input-comfort text-[#1A1412]"
                  autoComplete="email"
                  disabled={status === 'loading'}
                />
                {errorMsg && (
                  <p className="text-[#C4472B] font-bold text-base" role="alert">
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-text w-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 rounded-full min-h-[56px] text-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={22} />
                      Guardando…
                    </>
                  ) : (
                    'Quiero mi recordatorio'
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="mt-10 text-base text-[#9C8B80]">
            {siteConfig.stats.instagram} en redes · Hecho en Puerto Rico
          </p>
        </div>
      </div>
    </main>
  );
}
