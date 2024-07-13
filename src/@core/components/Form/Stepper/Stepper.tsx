import { cn } from "@/lib/utils";
import "./style.css"
import TickIcon from "/public/icons/tick.svg"
import { useEffect, useState } from "react";
const Stepper = ({ steps, currentState }: { steps: string[], currentState: number }) => {


    return (
        <div className="flex w-full justify-between transition-all ">
            {
                steps.map((step, i) => {

                    return (
                        <div className={cn("step-item transition-all", { "active": (currentState == i) }, { "complete": (currentState > i) })}>
                            <p className={cn("step")}>{(currentState > i) ? <TickIcon className="fill-white" /> : i + 1}</p>
                            <p className="text-gray-200 step-name  text-sm sm:text-lg" key={i}>{step}</p>
                        </div>
                    )


                })
            }
        </div>

    );
}

export default Stepper;