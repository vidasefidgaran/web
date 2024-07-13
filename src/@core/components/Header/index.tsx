
import Image from "next/image";
import Container from "@/@core/components/Container";
import Logo from "../../../../public/images/Logo.png"
import Link from "next/link";
import ClientLink from "../CustomLink/CustomLinkClient";
import CustomLink from "../CustomLink/CustomLink";
import UserIcon from "/public/icons/user.svg";
import MenuIcon from "/public/icons/menu.svg"
const Header = () => {


    return (


        <header className=" header   w-full   mx-auto flex flex-col  justify-between   items-center        bg-transparent bg-white ">
            <div className="flex flex-row justify-between  items-center  px-4   py-2   w-full  shadow-2">

                <div className=" flex flex-row gap-20 items-center">
                    <Link href={""} className="flex flex-row items-center gap-2">
                        <Image alt="شرکت  دقیق نگر نقش جهان " objectFit="cover" src={Logo} height={72} className="h-[50px] w-auto" />
                        <p className=" sm:font-black   font-extrabold text-neutral-700 lg:text-xl sm:text-lg text-base  ">شهرداری <span className="text-tints-600" >اصفهان </span> </p>
                    </Link>
                    <ul className=" text-center sm:flex flex-row items-center hidden ">
                        <ClientLink href="/map" text="نقشه" className="text-lg font-normal" isActive />
                        <ClientLink href="/scan" text="اسکن درخت" className="text-lg font-normal" isActive />
                        <ClientLink href="/contact-us" text="تماس با " className="text-lg font-normal" isActive />

                    </ul>

                </div>
                <ul className=" flex flex-row gap-1">

                    <CustomLink IconComponent={<UserIcon />} href="/login" text="" />
                    <CustomLink className="sm:hidden" IconComponent={<MenuIcon />} href="/login" text="" />

                </ul>
            </div>
            <hr className="w-full bg-white " />


        </header>

    );
}


<header className="">

</header>
export default Header;