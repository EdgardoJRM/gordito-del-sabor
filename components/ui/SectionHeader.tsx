type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = dark ? 'text-[#FAF8F5]' : 'text-[#1A1412]';
  const subColor = dark ? 'text-[#C4B8AE]' : 'text-[#6B5B4E]';
  const eyebrowColor = dark ? 'text-[#E8D4BC]' : 'text-[#6B5B4E]';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 space-y-4 ${alignClass}`}>
      {eyebrow && (
        <p className={`label-eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <h2 className={`heading-section ${titleColor}`}>{title}</h2>
      {subtitle && (
        <p className={`subheadline max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${subColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
