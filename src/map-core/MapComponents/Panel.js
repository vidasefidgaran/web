import { useState } from "react";
import EditIcon from "../assets/icons/EditIcon.svg";
import { cn } from "../lib/helper";
import { Button } from "@nextui-org/react";
import DrawFeatures from "./DrawFeatures";

const Panel = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div
      className={cn(
        "fill-neutral-600  absolute -translate-y-[50%]   top-[50%] right-2  bg-white p-3  z-50  rounded-lg drop-shadow flex flex-col justify-center items-center gap-4 ",
        { " ": isShow }
      )}
    >
      <Button
        isIconOnly
        color={isShow ? "success" : "default"}
        aria-label="Like"
      >
        <EditIcon
          className={cn("fill-neutral-900 ", {
            "fill-white ": isShow,
          })}
        />
      </Button>
      {isShow && (
        <div className="flex flex-col gap-4 ">
          <DrawFeatures />
          <EditIcon
            className={cn("fill-neutral-900 ", {
              "fill-white ": !isShow,
            })}
          />
          <EditIcon
            className={cn("fill-neutral-900 ", {
              "fill-white ": !isShow,
            })}
          />
          <EditIcon
            className={cn("fill-neutral-900 ", {
              "fill-white ": !isShow,
            })}
          />
        </div>
      )}
    </div>
  );
};

export default Panel;
