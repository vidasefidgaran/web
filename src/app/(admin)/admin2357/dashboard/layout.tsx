import { Inter } from "next/font/google";
import AdminSidebar from "@/components/sidbar/AdminSidebar";
import AdminNav from "@/components/Nav/AdminNav";
import "@/app/styles/dashboard.css";
import AdminInitializer from "@/@core/components/appInitializer/AdminInitializer";
import TreeEdit from "@/components/shared/Modal/TreeModal/TreeEdit";
const inter = Inter({ subsets: ["latin"] });
import "./style.css"
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <AdminInitializer  >
            <div className="flex h-full w-screen 2xl:mx-auto bg-paper">
                <AdminSidebar />
                <main className="w-full flex flex-col  justify-start pt-3  px-3   h-[100vh] ">
                    <AdminNav />
                    <main className=" p-3  my-3 md:w-[calc(100vw-260px)] w-full   rounded-xl  overflow-hidden flex flex-col gap-3">
                        {children}
                    </main>
                </main>
            </div>
            <TreeEdit />
        </AdminInitializer>


    );
}