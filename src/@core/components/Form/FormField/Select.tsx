import { Controller , Control } from "react-hook-form";

interface Option {
  value : string ;
  label :string
}

interface SelectionProps {
  name: string;
  options?:  Option[];
  control?: Control<any>;
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  isRtl?: boolean;
  defaultValue?: string;
}

const Selection:React.FC<SelectionProps>  = ({
  name,
  options,
  control,
  id,
  label,
  required = false,
  className = "",
  isRtl = false,
  defaultValue,
}) => {
  return (
    <div
      className={`w-full flex flex-row justify-center items-center gap-2  ${className}`}
    >
      <label className="w-1/3">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <select
            {...field}
            id={id}
            className={`${className}  border-1 border-neutral-300 py-2 px-1  rounded-md`}
          >
            <option value="">انتخاب کنید</option>
            {options?.map((option) => {
              return (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.value == defaultValue}
                >
                  {option.label}
                </option>
              );
            })}
          </select>
        )}
      />
    </div>
  );
};
export default Selection;
