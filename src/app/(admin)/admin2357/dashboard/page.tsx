"use client";
import FilterSection from "@/@core/components/filterSection/FlterSection";
import PlusIcon from "@/../public/icons/add-circle-icon.svg";

import "@/app/styles/dashboard.css";

import { useState } from "react";
import CustomLinkClient from "@/@core/components/CustomLink/CustomLinkClient";
import DashBoardTable from "@/@core/components/Tabale/DashBoardTable";

const Dashboard = () => {
    const [page, setPage] = useState("usersList");
    const treeCoulmns = [
        {
            key: "code",
            label: "کد",
        },
        {
            key: "x",
            label: "x",
        },
        {
            key: "y",
            label: "y",
        },
        {
            key: "baseRegionName",
            label: "نام منطقه",
        },
        {
            key: "baseTreeTypeName",
            label: "نوع درخت",
        },
        {
            key: "basePlantTypeName",
            label: "نوع گیاه",
        },
        {
            key: "basePlantNatureName",
            label: "نوع طبیعت",
        },
        {
            key: "baseTreeIrrigationTypeName",
            label: "نوع آبیاری",
        },
        {
            key: "streetName",
            label: "نام خیابان",
        },
        {
            key: "shamsiTreeDate",
            label: "تاریخ کاشت",
        },
        {
            key: "note",
            label: "توضیحات",
        },
        {
            key: "status",
            label: "وضعیت",
        },
        {
            key: "userName",
            label: "کاربر ثبت کننده",
        },
        {
            key: "diameter",
            label: "قطر درخت",
        },
        {
            key: "height",
            label: "ارتفاع درخت",
        },
        {
            key: "treeTag",
            label: "تشتک",
        },
        {
            key: "id",
            label: "ID",
        },
        {
            key: "isEnabled",
            label: "فعال",
        }

        // {
        //   key: "actions",
        //   label: "عملیات ها",
        // },
    ];
    return (
        // <FilterSection />
        <div className="h-full  flex flex-col justify-start gap-4  ">
            <div className="flex justify-between items-center w-full h-[60x] ">
                <div className="gap-2">لیست درخت ها</div>
                <CustomLinkClient
                    className="bg-primary-500 text-white text-base"
                    href="dashboard/AddTree"
                    text="افزودن"
                    IconComponent={<PlusIcon fill="white" />}
                />
            </div>
            <DashBoardTable url={"/Tree/getalltrees"} columns={treeCoulmns} />

            {/* <Table /> */}
        </div>
    );
};

export default Dashboard;
