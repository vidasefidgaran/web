"use client"

import { cn } from "@/lib/utils";
import MeasurementControl from "@/map-core/Controls/MeasurementControl";
import Sidebar from "@/map-core/components/sidebar";
import MapProvider from "@/map-core/context/mapProvider"
import MapInitializer from "@/map-core/map/Map";
import useSidebarStore from "@/map-core/store/useSidebar";
const Gis = () => {
    const { isOpen, onOpen, onClose } = useSidebarStore()

    return (
        <MapProvider zoom={10} center={[0, 0]} >
            <div className={cn("w-full h-screen flex flex-row items-center justify-between gap-2 ")} >
                <div className={cn("h-full  w-screen rounded-lg overflow-hidden  relative gap-3 border-white border-[8px]", { "w-[calc(100%-250px)]": isOpen })}>
                    <MapInitializer zoom={10} center={[0, 0]} />
                </div>


                <Sidebar />
            </div>
,

        </MapProvider>

    );
}

export default Gis;