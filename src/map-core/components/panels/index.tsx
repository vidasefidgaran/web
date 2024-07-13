import { cn } from "@/lib/utils";
import Tools from "@/../public/icons/tools.svg"
import Layers from "@/../public/icons/layers.svg"
import { TABS } from "@/map-core/types";
import List from "@/map-core/components/listing/index"
import { useContext, useState } from "react";
import closedPanelItem from "../listing/teplates/closedPanelItem";
import MapContext from "@/map-core/context/MapContext";
import { steps } from "framer-motion";

const Panels = ({ selectedTap, isOpen }: { selectedTap: TABS, isOpen: boolean }) => {
    const { handleItemsSelect, handleControllSelect, selecedItem } = useContext(MapContext);

    const handelSelect = (tool: string, category = "measurement") => {
        handleItemsSelect(tool)
        handleControllSelect(category)
    }
    const closedTabs = [
        { name: "move", controller: "measurement", icon: "mynaui:mouse-pointer", onClick: () => handelSelect("move") },
        { name: "Polygon", controller: "drawer", icon: "ph:polygon-duotone", onClick: () => handelSelect("Polygon", "drawer") },
        { name: "area", controller: "measurement", icon: "uil:polygon", onClick: () => handelSelect("area") },
        { name: "line", controller: "measurement", icon: "pepicons-pop:line-y", onClick: () => handelSelect("line") },
        { name: "type", controller: "measurement", icon: "octicon:typography-24", onClick: () => handelSelect("type") },
        { name: "print", controller: "report", icon: "solar:printer-linear", onClick: () => handelSelect("print", "report") },
        { name: "screenshot", controller: "report", icon: "tabler:screenshot", onClick: () => handelSelect("screenshot", "report") },
        { name: "compass", controller: "measurement", icon: "map:compass", onClick: () => handelSelect("compass", "measurement") },
        { name: "report-click", controller: "measurement", icon: "ic:round-ads-click", onClick: () => handelSelect("report-click") },
        { name: "filter-area", controller: "measurement", icon: "gis:polygon-hole-pt", onClick: () => handelSelect("filter-area") },
        { name: "grid", controller: "measurement", icon: "f7:grid", onClick: () => handelSelect("grid", "measurement") }
    ]
    return (
        <div className={cn("w-full flex  flex-col  justify-between  flex-grow  gap-10  items-center ", { "flex-row  flex-row-reverse justify-around  items-center mt-0": isOpen })} >
            {!isOpen && (
                <div className={cn("tab-panel    justify-center  h-full mb-3  flex flex-col gap-4  py-5  rounded-lg w-[70px] items-center    text    ", { "flex-row w-full justify-between  px-2": isOpen })}>
                    {selectedTap == TABS.Tools && (
                        <List ItemComponent={closedPanelItem} activeItem={selecedItem} className={cn("flex flex-col  m-2 p-2 rounded-lg w-[70px] items-center py-2   text gap-4   ", { "flex-row w-full justify-between px-2": isOpen })} resourcName="panelitems" items={closedTabs} />
                    )}
                    {selectedTap == TABS.LAYERS && (
                        // <List ItemComponent={closedPanelItem} activeItem={selectedTools} className={cn("flex flex-col gap-5 m-2 p-2 rounded-lg w-[70px] items-center py-2   text pag-2   ", { "flex-row w-full justify-between px-2": isOpen })} resourcName="panelitems" items={closedTabs} />
                        <div>
                            ss
                        </div>
                    )}
                </div>
            )
            }
        </div >
    );
}

export default Panels;