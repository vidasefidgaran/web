"use client"
import { Inter } from "next/font/google";
import AdminSidebar from "@/components/sidbar/AdminSidebar";
import AdminNav from "@/components/Nav/AdminNav";
import "@/app/styles/dashboard.css";
import { userStore } from "@/store/userStore";
import { Children, useEffect } from "react";
import AppInitializer from "@/@core/components/appInitializer/AppInitializer";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children
}


