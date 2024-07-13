import { cn } from "@/lib/utils";
import React, { FC, ReactElement } from "react";
import Link from "next/link";

interface TLinkProps {
  className?: string;
  IconComponent:ReactElement<HTMLElement>;
  iconClassName?: string;
  isShadow?: boolean;
  text?: string;
  href: string;
}

const ClientLink: FC<TLinkProps> = ({
  className,
  IconComponent,
  iconClassName,
  isShadow,
  text,
  href,
}) => {
  const StyledIconComponent = () => {
    return React.cloneElement(IconComponent, { className: cn(iconClassName) });
  };

  return (
    <Link
      href={href || ""}
      className={cn(
        " flex flex-row justify-center items-center  gap-3 py-2 bg-primary shadow-first-botton  text-white    text-lg px-2  rounded-md  bg-primary-500  ",
        { "pl-3 pr-5": text },
        className
      )}
    >
      {text && <span>{text}</span>}
      {IconComponent ? <StyledIconComponent /> : null}
    </Link>
  );
};

export default ClientLink;
