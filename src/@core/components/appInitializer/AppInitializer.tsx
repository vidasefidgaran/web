"use client";
import React, { useEffect , ReactNode} from "react";
import { NextUIProvider } from "@nextui-org/react";
import { userStore } from "@/store/userStore";
import { getCookie, setCookie } from "cookies-next";
import { requestHandler } from "@/lib/axios/requestHandler";
import {AxiosPrivate} from "@/lib/axios/axiosPrivate";
import { useRouter } from "next/navigation";
import {Tresponse} from "@/types/index"
interface AppInitializerprops {
  children :ReactNode
}

export default function AppInitializer({ children }:AppInitializerprops) {
  const { setUser, user, isLoading, setILoading } = userStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setILoading(true);
      const data = requestHandler<undefined, object>(() => AxiosPrivate.post("/account/authme"))()
        .then((data) => {
          if (data.code === "success") {
            setUser({ ...data.data }); // Include role from decoded token
          }
        })
        .finally(() => {
          setILoading(false);
        });
      await data;
    };

    fetchUser();
  }, [router, setUser]);

  return <NextUIProvider>{children}</NextUIProvider>;
}
