export type DonationReasonCardProps = {
  title: string;
  description: string;
}

export function DonationReasonCard({ title, description }: DonationReasonCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-lg font-medium text-accent mb-8 leading-none">
        {title}
      </h3>
      <p className="text-sm text-fg">
        {description}
      </p>
    </div>
  );
}
