export type CategoryItem = {
  id: number;
  name: string;
  href: string;
  popularity: number;
};

export type CategoryCardProps = {
  title: string;
  items: CategoryItem[];
  decorationImage?: string;
  viewAllHref: string;
  layout?: "1col" | "2col";
};
