import React from 'react';
import { Controller, Control } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface CustomDatePickerProps {
    control: Control<any>;
    name: string;
    label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ control, name, label }) => {

    function convertPersianToEnglishNumbers(persianText: string): string {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        return persianText.replace(/[۰-۹]/g, (match) => {
            return englishDigits[persianDigits.indexOf(match)];
        });
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
                <div className="flex flex-row gap-3">
                    <label className='w-fit'>{label}</label>
                    <DatePicker
                        placeholder="1380/01/02"
                        value={value}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD" 
                        onChange={(date: any) => onChange({ target: { name, value: convertPersianToEnglishNumbers(date?.format?.("YYYY/MM/DD")) } })}
                    />
                </div>
            )}
        />
    );
};

export default CustomDatePicker;
