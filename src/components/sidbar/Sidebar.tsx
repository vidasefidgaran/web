"use client";
import Image from "next/image";
import Logo from "/public/images/logo.png";
import CloseIcon from "/public/icons/close-icon.svg";
import useSidebar from "@/hooks/useSidebar";
import Link from "next/link";
import { useEffect, useRef, RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
interface MenuItem {
  urlAddress: string;
  title: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { isOpen, onClose, onOpen } = useSidebar();
  const sidebarRef :RefObject<HTMLDivElement> = useRef(null); // Create a ref for the sidebar element
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const handleClickOutside = (event: MouseEvent) => {
    //@ts-ignore
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      onClose(); // Close the modal when clicked outside the sidebar
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      {/* <Button onClick={() => onOpen()} className="absolute top-5 left-2 bg-white shadow-md rounded-md" IconComponent={<MenuIcon className="fill-neutral-700" />} /> */}

        {isOpen && (
          <aside className="main-sidebar absolute inset-0 z-50   bg-neutral-950/50  transition-transform   ">
            <div
              className="sidebar absolute right-0   w-[285px]  inset-y-0  bg-white  py-10  px-2  shadow-lg   rounded-tl-md  rounded-bl-md "
              ref={sidebarRef}
            >
              <button
                onClick={() => onClose()}
                className="absolute top-2 left-2"
              >
                <CloseIcon className="fill-neutral-800" />
              </button>
              <div className="w-full  flex flex-row  gap-3 mb-4">
                <Image
                  alt=""
                  src={Logo}
                  height={100}
                  width={100}
                  className=" w-[70px] h-[70px]"
                />
                <div className="flex flex-col justify-center items-start gap-4">
                  <h2 className=" text-base font-bold">
                    {" "}
                    سازمان سیما منظر و فضای سبز
                  </h2>
                  <span className="text-md  font-black text-primary-700 text-start  ">
                    {process.env.APP_PROVIDER}
                  </span>
                </div>
              </div>
                <AnimatePresence>
                    
                {menuItems.map((value: any, index: any) => (
                  //@ts-ignore
                  <motion.div
                  key={index}
                  variants={variants}
                  initial = 'intiial'
                  animate = 'animate'
                  exit={{ opacity: 0, y: 50 }}
                  transition={{delay :index* 0.9}}
                  >
                  <Link
                    className=" flex items-center space-x-2 pl-1 group hover:border-l-2 hover:border-l-primary-700 hover:font-semibold  py-4"
                    href={value.urlAddress}
                    key={index}
                  >
                    <span>{value.title}</span>
                  </Link>
                  </motion.div>
                ))}
               
                </AnimatePresence>

            </div>
          </aside>
        )}

    </>
  );
};

// export default Sidebar;

// const Sidebar = ({ menuItems }: { menuItems: any }) => {
//     const { isOpen, onClose, onOpen } = useSidebar()
//     const sidebarRef = useRef(null); // Create a ref for the sidebar element

//     const handleClickOutside = (event: any) => {
//         //@ts-ignore
//         if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//             onClose(); // Close the modal when clicked outside the sidebar
//         }
//     };
//     useEffect(() => {

//         if (isOpen) {
//             document.addEventListener("click", handleClickOutside)
//         }

//         return () => {
//             // Remove event listener on cleanup
//             document.removeEventListener("click", handleClickOutside);
//         };
//     }, [isOpen]);
//     return (
//         <>
//             {/* <Button onClick={() => onOpen()} className="absolute top-5 left-2 bg-white shadow-md rounded-md" IconComponent={<MenuIcon className="fill-neutral-700" />} /> */}

//             {isOpen && (
//                 <aside className="absolute inset-0 z-50    bg-neutral-950/50  transition-transform   " >
//                     <div className="absolute right-0   w-[285px]  inset-y-0  bg-white  py-10  px-2  shadow-lg   rounded-tl-md  rounded-bl-md " >
//                         <button onClick={() => onClose()} className="absolute top-2 left-2"  ><CloseIcon className=" " /></button>
//                         <div className="w-full  flex flex-row  gap-3 mb-4">
//                             <Image alt="" src={Logo} height={100} width={100} className=" w-[70px] h-[70px]" />
//                             <div className="flex flex-col justify-center items-start gap-4">
//                                 <h2 className=" text-base font-bold"> سازمان سیما منظر و فضای سبز</h2>
//                                 <span className="text-md  font-black text-primary-700 text-start  ">{process.env.APP_PROVIDER}</span>
//                             </div>
//                         </div>
//                         <hr className="mx-2 bg-neutral-100" />
//                         {menuItems.map((item: any) => (

//                             //@ts-ignore
//                             <Link className=" flex items-center space-x-2 pl-1 group hover:border-l-2 hover:border-l-primary-700 hover:font-semibold  py-4" href={item.urlAddress}>

//                                 {/* <svg className="h-6 ml-1 w-6 group-hover:stroke-primary-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>

//                     </svg>
//                      */}

//                                 <span>{item.title}</span>

//                             </Link>
//                         ))}
//                     </div>
//                 </aside>

//             )}
//         </>
//     );
// }

export default Sidebar;
