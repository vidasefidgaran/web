import ScanIcon from "/public/icons/scan-icon.svg"
import MapIcon from "/public/icons/map-icon.svg"
import HomeIcon from "/public/icons/home-icon.svg"
import UserIcon from "/public/icons/user-cion.svg"

import ClientLink from "../CustomLink/CustomLinkClient";
const Navigation = () => {
    return (
        <div className=" z-10 shadow-top fixed visible  sm:max-w-[800px] sm:left-[50%] sm:translate-x-[-50%]  bottom-0 h-[58px]  w-screen  flex flex-row justify-around gap-8  items-center  py-3 px-6  bg-white rounded-t-lg" >
            <ClientLink href="/map" IconComponent={<MapIcon />} iconClassName="fill-neutral-400" activeIconClassName="fill-neutral-700" />
            <ClientLink href="/" IconComponent={<HomeIcon />} iconClassName="fill-neutral-400" activeIconClassName="fill-neutral-700" />
            <ClientLink href="/login" IconComponent={<UserIcon />} iconClassName="fill-neutral-400" activeIconClassName="fill-neutral-700 " />
            <ClientLink href="/scan" IconComponent={<ScanIcon />} ActiveClassName="  " iconClassName="fill-white  overflow-visible  border-box btn-shadow-active " className="absolute bg-primary-500 -top-[22px] w-[44px] rounded-full h-[44px]   btn-shadow   px-0 items-center justify-center  left-5   transition  " />

        </div>
    );
}

export default Navigation;