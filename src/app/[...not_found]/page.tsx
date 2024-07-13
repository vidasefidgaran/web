import Maintenance from "/public/images/maintenance.svg"
import CustomLink from "@/@core/components/CustomLink/CustomLink";
import Image from "next/image";
import LeftArrowIcon from "/public/icons/arrow-left.svg"

const FourOhFour = () => {
    return (

        <div className="flex flex-col w-full justify-center items-center  gap-4 ">

            <Maintenance className="w-screen sm:w-[400px] mx-30 h-auto" />
            <h1>در حال توسعه ...</h1>
            <CustomLink IconComponent={<LeftArrowIcon />} text="مشاهده نقشه " isShadow href="/map" />
        </div>



    );
}

export default FourOhFour;