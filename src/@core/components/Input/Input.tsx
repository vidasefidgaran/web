import React from "react";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";
interface inputProps {
  id: string;
  isTextarea?: boolean;
  label: string;
  disabled?: boolean;
  type: string;
  errors?: FieldErrors;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  inForm: boolean;
}

const Input: React.FC<inputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
  isTextarea,
  inForm = true,
}) => {
  {
    return (
      <div className="relative w-full">
        <input
          type={type}
          placeholder=" "
          id={id}
          disabled={disabled}
          {...(inForm && register ? register(id, { required }) : {})}
          className={`peer   px-2 
                py-6  pb-4 h-10  text-base rounded-md   border font-light bg-white  disabled:opacity-70
                disabled:cursor-not-allowed ${
                  inForm && errors && errors[id]
                    ? " border-rose-500"
                    : "border-none outline-none"
                } 
             
                `}
        />

        <label
          htmlFor={id}
          className={`abselote right-2 transform duration-150 z-50 -translate-y-3 absolute text-sm top-3  ${
            inForm && errors && errors[id]
              ? "focus:text-rose-500"
              : "focus:border-gray-400"
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:right-0 peer-focus:-translate-y-3 peer-focus:text-gray-700   `}
        >
          {label}
        </label>
      </div>
    );
  }
};

export default Input;
