import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

type BrandLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/** Logo oficial siempre sobre fondo blanco — legible en nav oscuro y claro. */
export default function BrandLogo({
  width = 64,
  height = 64,
  className = '',
  imageClassName = 'object-contain',
  priority = false,
}: BrandLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-white rounded-xl overflow-hidden shrink-0 ${className}`}
    >
      <Image
        src={siteConfig.logoPath}
        alt={siteConfig.brandName}
        width={width}
        height={height}
        className={imageClassName}
        priority={priority}
      />
    </span>
  );
}
