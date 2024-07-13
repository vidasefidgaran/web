"use client";
import FilterSection from "@/@core/components/filterSection/FlterSection";
import PlusIcon from "@/../public/icons/add-circle-icon.svg";

import "@/app/styles/dashboard.css";
import DashBoardTable from "@/@core/components/Tabale/DashBoardTable";
import { users, columns } from "@/components/shared/Table/data";
import { useEffect, useState } from "react";
import CustomLinkClient from "@/@core/components/CustomLink/CustomLinkClient";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [page, setPage] = useState("usersList");
    const router = useRouter()
    useEffect(() => {
        router.push("dashboard")
    }, [])
    return (
        // <FilterSection />
        <div className="h-full flex flex-col justify-start gap-4 ">



        </div>
    );
};

export default Dashboard;
