"use client"
import CustomLink from "../CustomLink/CustomLink";
import Input from "../Input/Input";
import AddIcon from "/public/icons/add-circle-icon.svg"
const FilterSection = () => {
    return (
        <section>
            <div className="bg-secound-color/50/70 py-4 mt-12  rounded-xl px-5 sm:px-10    relative bg-no-repeat bg-right bg-contain ">
                <div className="w-full flex flex-row  justify-between items-center">
                    <div className="text-secound-color/800 font-semibold text-2xl">لیست درختان</div>
                    <div className=" flex flex-row justify-center items-center  gap-4">
                        <Input id="FilterInput" inForm={false} type="text" label=" جستجو با کد  " />
                        <CustomLink text="افزودن درخت " IconComponent={<AddIcon />} iconClassName="fill-white" className="hover:shadow-sm  " href="/dashboard/addtree" />
                    </div>
                </div>




            </div>
        </section>
    );
}

export default FilterSection;