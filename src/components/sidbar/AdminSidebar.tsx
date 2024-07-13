"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/images/logo.png";
import { useSlider } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CustomLinkClient from "../../@core/components/CustomLink/CustomLinkClient";
import { AnimatePresence, motion } from "framer-motion";
import index from "@/map-core/components/listing";
const AdminSidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  };
  const axios = usePrivateAxios();
  const route = useSearchParams();
  useEffect(() => {
    axios.get("/Account/getmenuitems").then((data) => {
      setMenuItems(data.data);
    });
  }, []);
  return (
    <>
      <aside className="bg-white w-[280px]  pr-2 pt-4  hidden md:block ">
        <div className="w-full  flex flex-row  gap-2 mb-4">
          <Image
            alt=""
            src={Logo}
            height={100}
            width={100}
            className=" w-[50px]  h-[50px] "
          />
          <div className="flex flex-col justify-center items-start gap-2">
            <h2 className="text-medium  font-extrabold  text-neutral-800 text-start  ">
              {process.env.APP_PROVIDER}
            </h2>

            <span className=" text-sm   text-neutral-400 ">
              {" "}
              سازمان سیما منظر و فضای سبز
            </span>
          </div>
        </div>

        {/* <!-- Menu --> */}
        <div className="mt-12 flex flex-col space-y-7 pr-3 text-gray-500 font-medium">
          <AnimatePresence>
            {menuItems.map((item: any , index : any) => (
              <motion.div
                key={item.id}
                variants={variants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.3 }}
              >
                <CustomLinkClient
                  href={item.urlAddress}
                  text={item.title}
                  className="text-neutral-600  justify-start  text-base  py-3 px-2 ml-9 "
                  ActiveClassName="bg-primary-600/15  text-primary-600"
                  activeComponent={
                    <div className="absolute -right-1 w-2 h-[42px] bg-primary-500 rounded-lg "></div>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </aside>

      <Sidebar menuItems={menuItems} />
    </>
  );
};

export default AdminSidebar;
