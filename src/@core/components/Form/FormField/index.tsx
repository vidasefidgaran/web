"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

// Define the type for the form field
type TFormField = {
  icon?: ReactNode;
  id: string;
  label?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type: string;
  disabled?: boolean;
  className?: string;
  IconComponent?: any;
  placeholder?: string;
};

const Input: React.FC<TFormField> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
  className,
  IconComponent,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      {IconComponent && (
        <div className="absolute right-3 translate-y-4">
          {IconComponent}
        </div>
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        type={type}
        className={cn(
          "peer w-full p-3 transition bg-white border rounded-md outline-none",
          "focus:border-blue-500",
          errors[id] ? "border-rose-500" : "border-gray-300",
          disabled ? "cursor-not-allowed opacity-70" : "",
          IconComponent ? "pr-9" : ""
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute text-sm text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-2 origin-[0] left-3",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4",
          "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:top-2",
          errors[id] ? "text-rose-500" : "",
          IconComponent ? "left-12 peer-focus:left-3" : ""
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
