export type DonationReasonCardProps = {
  title: string;
  description: string;
}

export function DonationReasonCard({ title, description }: DonationReasonCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 flex-1">
      <h3 className="text-[18px] font-medium text-[#E30C5C] mb-8">
        {title}
      </h3>
      <p className="text-[14px] text-[#323237]">
        {description}
      </p>
    </div>
  );
}