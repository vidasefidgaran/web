"use client"

import { userStore } from "@/store/userStore";
import { useState } from "react";
import useSidebarStore from "@/hooks/useSidebar";
import { Avatar, Badge, Input } from "@nextui-org/react";
import SearchIcon from "@/../public/icons/search-icon.svg"
import MessageIcon from "@/../public/icons/message.svg";
import Notif from "@/../public/icons/notif.svg";

const AdminNav = () => {
    const { user } = userStore()
    const [isShowModal, setIsShowModal] = useState(false)
    const { onOpen } = useSidebarStore()

    const handleClick = () => {

    }

    return (
        <nav className="text-lg flex h-[60px] items-center justify-between content-center ">
            <div className="flex-row justify-center font-semibold text-xl text-gray-800 flex space-x-4 items-center ">

                <Input
                    placeholder="جستجو..."
                    isClearable
                    radius="lg"
                    labelPlacement="outside"
                    width="300px"
                    classNames={{

                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "hover:bg-white",

                            "bg-white",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-white",
                        inputWrapper: [

                            "bg-white",

                            "hover:bg-white",
                            "group-data-[focus=true]:bg-white",
                            "!cursor-text",
                        ],
                    }}
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </div>

            <div className="flex  text-gray-500 items-center content-center justify-between gap-5 text-base ">
                <Badge content="5" color="success" shape="rectangle" showOutline={false} className="text-neutral-700 bg-white border-2 border-primary-600">
                    <div className="bg-primary-600/70 p-2 rounded-lg">
                        <MessageIcon />
                    </div>

                </Badge>
                <Badge content="5" color="success" shape="rectangle" showOutline={false} className="text-neutral-700 bg-white border-2 border-primary-600">
                    <div className="bg-primary-600/70 p-2 rounded-lg">
                        <Notif />
                    </div>
                </Badge>
                <Badge content="" color="success" shape="circle" placement="bottom-right" className="">
                    <div className="flex flex-row gap-2">
                        <Avatar
                            radius="full"
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                        />
                        <div className="flex flex-col ">
                            <span>رضا احمدی</span>
                            <span>admin@gmail.com</span>
                        </div>
                    </div>

                </Badge>
                {/* <div className="flex flex-row justify-center px-2 py-2  bg-white rounded-full items-center gap-2 " onClick={() => setIsShowModal(m => !m)}  >
                    <Image src={avatar} height={100} width={100} alt="" className="rounded-full w-9 h-9 fill-slate-500  " />
                    <p className="pl-1 sm:block text-sm" >{user.given_name}</p>
                    <ArrowDownIcon className="w-[24px] h-[24px]" />
                </div> */}

                {/* dropDown */}


            </div>
        </nav >
    );
}

export default AdminNav;