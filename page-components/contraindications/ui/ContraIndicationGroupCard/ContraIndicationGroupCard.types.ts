export type ContraIndicationGroupCardItem = {
  text: string;
  isActive?: boolean;
  linkText?: string;
  onClick?: () => void;
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
