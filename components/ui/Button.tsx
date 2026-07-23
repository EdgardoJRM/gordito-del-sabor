import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';
type Size = 'md' | 'sm' | 'lg';

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  'btn-text inline-flex items-center justify-center rounded-pill transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm';

const variants: Record<Variant, string> = {
  primary: 'bg-accent hover:bg-accent-hover text-white shadow-soft hover:shadow-media',
  secondary:
    'border border-warm-dark text-warm-dark hover:bg-warm-dark hover:text-warm bg-transparent',
  dark: 'bg-warm-dark text-warm hover:bg-black',
  ghost: 'border border-warm text-warm hover:bg-warm hover:text-warm-dark bg-transparent',
};

const sizes: Record<Size, string> = {
  md: 'py-4 px-8 md:px-10 text-base min-h-[48px]',
  sm: 'py-3 px-6 text-base min-h-[44px]',
  lg: 'py-5 px-10 text-lg min-h-[56px]',
};

export default function Button({
  children,
  href,
  external,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  if (href) {
    const isExternalUrl = external || href.startsWith('http');
    const isMailto = href.startsWith('mailto:');

    if (isExternalUrl) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    if (isMailto) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
