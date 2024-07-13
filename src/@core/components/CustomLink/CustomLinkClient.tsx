"use client"
import { cn } from "@/lib/utils";
import { TLinkProps } from "@/types";
import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CustomLinkClient: FC<TLinkProps> = ({ className, activeComponent, IconComponent, iconClassName, activeIconClassName, activeIconComponent, ActiveClassName, isShadow, text, href }) => {
    const pathName = usePathname()
    const isActive = pathName === href
    const ActiveClass = isActive ? ActiveClassName : ""
    const ActiveIconClass = isActive ? activeIconClassName : ""
    const searchParams = useSearchParams();
    const StyledIconComponent = () => {
        return React.cloneElement(IconComponent, { className: iconClassName });
    }

    const StyledActiveIconComponent = () => {

        return React.cloneElement(activeIconComponent, { className: cn(iconClassName) });
    }

    return (
        <Link
            href={href || ""}
            className={
                cn("rounded-md flex flex-row pl-3 pr-5 gap-3  py-2 text-neutral-700 boxshadow-first-botton  justify-center items-center  text-4xl  text-white  ",
                    className,
                    ActiveClass,
                    { "shadow-2 ": isShadow }

                )}>
            {text && <span >{text}</span>}
            {IconComponent && (!isActive ? <StyledIconComponent /> : <StyledActiveIconComponent />)}

            {(activeComponent && isActive) && activeComponent}
        </Link >
    );
};

export default CustomLinkClient;
