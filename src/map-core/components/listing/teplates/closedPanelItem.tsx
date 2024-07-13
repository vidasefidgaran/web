import { cn } from "@/lib/utils";
import Tools from "@/../public/icons/tools.svg";
import Layers from "@/../public/icons/layers.svg";
import Icon from "@/@core/components/icon";
import { AnimatePresence ,motion} from "framer-motion";
const closedPanelItem = ({ panelitems = {}, isActive }: any) => {
  return (
    <button
      className={cn(
        "w-full relative flex items-center justify-center rounded-md text-white p-4  mb-2"
      )}
      onClick={panelitems.onClick}
    >
      <Icon icon={panelitems.icon} className=" w-6 h-6  mx-auto " />
      <AnimatePresence>
        {isActive && (
          <motion.div className="absolute right-0 top-3 h-8 w-2 bg-white inset-y-0 rounded-lg "                         initial={{ opacity: 0, x: 20 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}/>
        )}
      </AnimatePresence>
    </button>
  );
};

export default closedPanelItem;
