'use client';

export type RequisiteItem = {
  label: string;
  value: string;
};

export type BankRequisitesBlockProps = {
  requisites: RequisiteItem[];
};

export function BankRequisitesBlock({ requisites }: BankRequisitesBlockProps) {
  return (
    <div className="bg-card rounded-2xl py-6 px-8 w-[588px] shadow-[0_4px_50px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col gap-3">
        {requisites.map((item, index) => (
          <div key={index} className="flex gap-[13px]">
            <div className="w-[216px] text-sm text-fg-secondary">
              {item.label}
            </div>
            <div className="flex-1 text-base font-semibold text-fg">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
