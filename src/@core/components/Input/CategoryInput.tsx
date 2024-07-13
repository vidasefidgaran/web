import React, { ReactNode } from "react";



interface CategoryInputProps {
    icon: ReactNode
    label: string
    onClick: (value: string) => void;
    selected: boolean
}
const CategoryInput: React.FC<CategoryInputProps> = ({
    icon,
    label,
    onClick,
    selected
}) => {

    return (
        <div className={`flex flex-row  border-[1px] rounded-md  p-4 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`} onClick={() => onClick(label)}  >
            {icon}
            <div className="font-semibold">{label}</div>

        </div>
    );
}

export default CategoryInput;