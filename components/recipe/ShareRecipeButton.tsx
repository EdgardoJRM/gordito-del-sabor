'use client';

import { Share2 } from 'lucide-react';
import { useCallback, useState } from 'react';

type Props = {
  title: string;
  recipePath: string;
};

export default function ShareRecipeButton({ title, recipePath }: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleShare = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const path = recipePath.startsWith('/') ? recipePath : `/${recipePath}`;
    const url = `${window.location.origin}${path}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
        return;
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 2500);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 2500);
    }
  }, [title, recipePath]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn-text w-full mt-8 bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 rounded-full transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
    >
      <Share2 size={20} />
      {status === 'copied'
        ? 'Enlace copiado'
        : status === 'error'
          ? 'Copia el enlace manualmente'
          : 'Compartir receta'}
    </button>
  );
}
