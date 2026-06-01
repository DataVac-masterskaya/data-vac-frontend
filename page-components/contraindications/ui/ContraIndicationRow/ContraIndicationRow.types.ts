export type ContraIndicationRowProps = {
  category: string;
  text: string;
  isActive?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
  onClick?: () => void;
  className?: string;
};
