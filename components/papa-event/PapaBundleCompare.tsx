'use client';

import { Check, Minus } from 'lucide-react';
import { getShopBundleIds, papaBundleCompare, papaBundles } from '@/lib/papa-event';

function CellValue({ value }: { value: boolean | string | undefined }) {
  if (value === undefined) return <Minus className="mx-auto text-[#C4B8AE]" size={20} aria-hidden />;
  if (typeof value === 'string') {
    return <span className="font-bold text-[#1A1412]">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto text-[#C4472B]" size={22} aria-label="Incluido" />
  ) : (
    <Minus className="mx-auto text-[#C4B8AE]" size={20} aria-label="No incluido" />
  );
}

const bundleIds = getShopBundleIds();

function featureValue(
  featureId: string,
  bundleId: (typeof bundleIds)[number]
): boolean | string | undefined {
  const bundle = papaBundles[bundleId];
  switch (featureId) {
    case 'aprons':
      return String(bundle.apronCount);
    case 'embroidery':
      return bundle.personalized;
    case 'recipe':
      return true;
    case 'video':
      return bundle.includesVipDigital ?? false;
    case 'whatsapp':
      return bundle.includesVipDigital ?? false;
    case 'delivery':
      return true;
    default:
      return undefined;
  }
}

export default function PapaBundleCompare() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#1A1412] mb-2">{papaBundleCompare.title}</h3>
        <p className="text-lg text-[#6B5B4E]">{papaBundleCompare.subtitle}</p>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#E8E0D8] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E8E0D8]">
              <th className="p-5 text-[#6B5B4E] font-medium w-[40%]">Incluye</th>
              {bundleIds.map((id) => {
                const bundle = papaBundles[id];
                return (
                  <th key={id} className="p-5 text-center">
                    <span className="block text-xl font-bold text-[#1A1412]">{bundle.title}</span>
                    <span className="block text-2xl font-bold text-[#C4472B] mt-1">
                      {bundle.priceLabel}
                    </span>
                    {bundle.badge && (
                      <span className="inline-block mt-2 rounded-full bg-[#C4472B] px-3 py-1 text-xs font-bold text-white">
                        {bundle.badge}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {papaBundleCompare.features.map((feature, rowIndex) => (
              <tr
                key={feature.id}
                className={rowIndex % 2 === 0 ? 'bg-[#FAF8F5]' : 'bg-white'}
              >
                <td className="p-5 text-[#1A1412] font-medium">{feature.label}</td>
                {bundleIds.map((id) => (
                  <td
                    key={id}
                    className={`p-5 text-center ${id === 'premium' ? 'bg-[#FFF8F5]/80' : ''}`}
                  >
                    <CellValue value={featureValue(feature.id, id)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {bundleIds.map((id) => {
          const bundle = papaBundles[id];
          return (
            <article
              key={id}
              className={`rounded-2xl border-2 p-5 ${
                bundle.recommended
                  ? 'border-[#C4472B] bg-[#FFF8F5]'
                  : 'border-[#E8E0D8] bg-white'
              }`}
            >
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <h4 className="text-xl font-bold text-[#1A1412]">{bundle.title}</h4>
                  {bundle.badge && (
                    <span className="text-sm font-bold text-[#C4472B]">{bundle.badge}</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-[#C4472B]">{bundle.priceLabel}</p>
              </div>
              <ul className="space-y-2">
                {papaBundleCompare.features.map((feature) => (
                  <li key={feature.id} className="flex justify-between gap-3 text-[#6B5B4E]">
                    <span>{feature.label}</span>
                    <span className="shrink-0">
                      <CellValue value={featureValue(feature.id, id)} />
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
