import { cn } from "@/lib/utils"
import React, { Children } from "react";


const Container = ({ children, className, isFullWidth }: { className?: string, isFullWidth?: boolean, children: React.ReactNode }) => {
    return (
        <div className={cn(" w-full max-w-[1141px] mx-auto px-[16px]  ", className, { "w-full max-w-none": isFullWidth })}>
            {children}
        </div>
    );
}

export default Container