"use client"
import React, { useEffect, useMemo, useState } from "react";
import CustomLink from "../../@core/components/CustomLink/CustomLink";
import LeftArrowIcon from "/public/icons/arrow-left.svg"
import ArrowUpIcon from "/public/icons/arrow-up.svg"
import CloseIcon from "/public/icons/close-icon.svg"
import InfoTreeIcon from "/public/icons/tree-icon.svg"
import dynamic from "next/dynamic";
import { cn, utmConvertor } from "@/lib/utils";
import MapComponent from "@/components/Map";
import { fromLonLat } from "ol/proj";
import Button from "@/@core/components/Button/index";
import useTreeModal from "@/hooks/useTreeModal";
import { Ttree } from "@/actions/treeActions";
import { error } from "console";
import toast from "react-hot-toast";
import { date } from "zod";
import { SuccessResponse } from "@/lib/axios/requestHandler";
import CodeStore from "@/store/CodeStore";
import { useRouter, useSearchParams } from "next/navigation";





const TreeInfo = () => {
    const [center, setCenter] = useState<any>()
    const { isOpen, onClose, onOpen, setData } = useTreeModal()
    const [isClose, setIsClose] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { info } = CodeStore()
    const searchParams = useSearchParams();
    const treeCode = searchParams.get('TreeCode');
    const router = useRouter()
    const handleCloseClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        router.push("/")
    };

    if (info?.id && treeCode) {
        return (
            <>




                <div className=" lg:left-auto md:top-[80px] md:bottom-auto  inset-x-0  absolute bottom-[90px]  mx-2 bg-white  rounded-lg drop-shadow-2xl md:w-[400px]  ">
                    <p className="pl-2 text-xs absolute  top-3 right-6">
                        کد : {info.Code}
                    </p>
                    <CloseIcon className="fill-neutral-700 absolute left-2 top-2" onClick={handleCloseClick} />

                    <div className={cn("w-full flex flex-col justify-center  px-6 gap-2 py-1", { "mb-3": !isClose })}    >
                        <div className="  flex flex-row items-center  justify-between  ">
                            <div className=" flex flex-row justify-between w-full  items-center  py-2  rounded-xlg text-neutral-800 mt-5">
                                <h2 className="sm:text-2xl text-lg font-black text-neutral-600 ">
                                    {info.BaseRegionName}
                                </h2>

                            </div>

                        </div>
                        <div className="flex flex-row justify-between ">
                            {/* <div className="flex flex-row gap-2  ">
                                    <label htmlFor="fdfd">منطقه</label>
                                    <p>{info.baseRegionName}</p>
                                </div> */}
                            <div className="flex flex-row  gap-2  ">
                                <label htmlFor="fdfd">خیابان:</label>
                                <p>{info.StreetName}</p>
                            </div>
                            <div className="flex flex-row gap-2  ">
                                <label htmlFor="fdfd">سال کاشت:</label>
                                <p>{info.ShamsiTreeDate}</p>
                            </div>

                        </div>
                        <div className="flex flex-row gap-3 justify-end">
                            <Button text="اطلاعات بیشتر" onClick={() => onOpen()} isIcon IconComponent={<LeftArrowIcon />} className="bg-gradient-to-tl from-primary-500 to-[#59E389] rounded-lg " />
                        </div>

                    </div>




                </div>



            </>

        )
    }
    // if (isLoading) {
    //     return (<MapComponent zoom={20} />)
    // }

};

export default TreeInfo;