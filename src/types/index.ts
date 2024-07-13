import React, { ReactNode } from "react";

export type contaener = string;
export type className = string;
export type TBottonProps = {
  className?: string;
  onClick: () => any;
  isIcon?: boolean;
  IconComponent?: any;
  iconClassName?: string;
  ActiveClassName?: string;
  activeIconClassName?: string;
  isShadow?: boolean;
  text?: string;
  isActive?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};
export type TLinkProps = {
  className?: string;
  href: string;
  ActiveClassName?: string;
  iconClassName?: string;
  activeIconClassName?: string;
  IconComponent?: any;
  activeIconComponent?: any;
  isShadow?: boolean;
  text?: string;
  isActive?: boolean;
  activeComponent?: ReactNode;
};

export type Tmodal = {
  title?: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  footer?: React.ReactElement;
  isOpen?: boolean;
  actionLabel?: string;
  disabled?: boolean;
  secoundaryAction?: () => void;
  secoundaryLabel?: string;
};
export type  Tresponse ={
  code:string;
  data?:object;
  error?:any
}