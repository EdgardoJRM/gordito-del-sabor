import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';
type Size = 'md' | 'sm';

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
  'btn-text inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4472B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]';

const variants: Record<Variant, string> = {
  primary: 'bg-[#C4472B] hover:bg-[#A8381F] text-white shadow-lg hover:shadow-xl',
  secondary:
    'border-2 border-[#1A1412] text-[#1A1412] hover:bg-[#1A1412] hover:text-[#FAF8F5] bg-transparent',
  dark: 'bg-[#1A1412] text-[#FAF8F5] hover:bg-black border border-[#2D2220]',
  ghost: 'border-2 border-[#FAF8F5] text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#1A1412] bg-transparent',
};

const sizes: Record<Size, string> = {
  md: 'py-4 px-8 md:px-10 text-base',
  sm: 'py-2.5 px-6 text-sm',
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
