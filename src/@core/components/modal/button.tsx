"use client";
import React, { ReactNode } from "react";

interface buttonProps {
  lable: string | undefined;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: ReactNode;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<buttonProps> = ({
  lable,
  disabled,
  outline,
  small,
  icon,
  onclick,
}) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`
            relative
            rounded-md
            hover:opacity-80 
            w-full
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:pointer-events-none
            ${
              outline
                ? "bg-white border-[1px] border-black   text-black  "
                : "bg-primary text-white"
            }
            ${small ? "py-1  text-sm font-light  " : "py-3 font-semibold"}
            
        `}
    >
      {icon}
      {lable}
    </button>
  );
};

export default Button;
