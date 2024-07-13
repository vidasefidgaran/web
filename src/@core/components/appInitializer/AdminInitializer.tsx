"use client";
import React, { useEffect, useState  , ReactNode} from "react";
import { NextUIProvider } from "@nextui-org/react";
import { userStore } from "@/store/userStore";
import { requestHandler } from "@/lib/axios/requestHandler";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";
import { Interface } from "readline";

interface AppInitializerprops 
{
  children :ReactNode ;
} 


export default function AppInitializer({ children  } : AppInitializerprops) {
  const { setUser, user, isLoading, setILoading } = userStore();
  const router = useRouter();
  const [body, setBody] = useState<ReactNode>(null);
  const Axios = usePrivateAxios();
  useEffect(() => {
    const fetchUser = async () => {
      setILoading(true);
      const data = requestHandler(() => Axios.post("/account/authme"))()
        .then((data) => {
          if (data.code === "success") {
            setUser({ ...data.data });
            setBody(children);
            // Include role from decoded token
          } else {
            setILoading(false);
            toast.error("درسترسی غیر مجاز");
            router.push("/admin2357/login");
          }
        })
        .finally(() => {
          setILoading(false);
        });
      await data;
    };

    fetchUser();
  }, [router, setUser]);

  return <NextUIProvider>{body}</NextUIProvider>;
}
