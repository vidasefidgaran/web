import useSidebarStore from "../store/useSidebar";
import "./style.css"
import Tools from "@/../public/icons/tools.svg"
import Layers from "@/../public/icons/layers.svg"
import ArrowLeft from "@/../public/icons/arrow-left.svg"
import Close from "@/../public/icons/close-icon.svg"
import { useState } from "react";
import { cn } from "@/lib/utils";
import Panels from "./panels";
import { TABS } from "../types";
import List from "@/map-core/components/listing/index"
import Tab from "@/map-core/components/listing/teplates/Tabs";
const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useSidebarStore()
    const [selectedTap, setSelectedTap] = useState(TABS.Tools)



    const handelTab = (type: TABS) => {
        setSelectedTap(type)
    }
    const tabItems = [
        { name: TABS.LAYERS, icon: "fe:layer", onClick: () => handelTab(TABS.LAYERS) },
        { name: TABS.Tools, icon: "formkit:tools", onClick: () => handelTab(TABS.Tools) }
    ]
    return (
        <div className={cn("controller bg-white  rounded-lg  h-full shadow-sm", { "controller-open": isOpen })} >
            {/* Tabs */}
            <div className={cn("w-full h-full flex flex-col justify-between gap-10  items-center mt-1  ", { "flex-row flex-row-reverse justify-around items-center mt-0": isOpen })} >
                {!isOpen ?
                    (<button onClick={onOpen}>
                        <ArrowLeft className="w-10 h-10  " />
                    </button>)
                    : (<button onClick={onClose}>
                        <Close className="w-10 h-10 ml-3 " />
                    </button>)}
                <List ItemComponent={Tab} activeItem={selectedTap} className={cn("controller-tab  flex flex-col gap-5 m-2 p-2 rounded-lg w-[70px] items-center py-2   text pag-2   ", { "flex-row w-full justify-between px-2": isOpen })} resourcName="tabItem" items={tabItems} />
                <Panels selectedTap={selectedTap} isOpen={isOpen} />
            </div>



        </div >
    );
}

export default Sidebar;

