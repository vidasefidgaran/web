import { cn } from "@/lib/utils";
import Tools from "@/../public/icons/tools.svg"
import Layers from "@/../public/icons/layers.svg"
import Icon from "@/@core/components/icon";
const Tab = ({ tabItem = {}, isActive }: any) => {

    return (
        <button className={cn("w-full  rounded-md text-white", { "bg-white text-neutral-700  ": isActive })} onClick={tabItem.onClick}  >
            <Icon icon={tabItem.icon} className=" w-10 h-10 p-1 mx-auto  " />
        </button>

    );
}

export default Tab;