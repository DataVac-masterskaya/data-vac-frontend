export type ContraIndicationGroupCardItem = {
  text: string;
  isActive?: boolean;
  linkText?: string;
  onClick?: () => void;
  href?: string;
};

export type ContraIndicationGroupCardGroup = {
  category: string;
  items: ContraIndicationGroupCardItem[];
};

export type ContraIndicationGroupCardProps = {
  title: string;
  groups: ContraIndicationGroupCardGroup[];
  className?: string;
};
