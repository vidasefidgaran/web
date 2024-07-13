import { Axios } from "@/lib/axios/axios";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AxiosError } from "axios";

export default function usePrivateAxios() {
  const { user } = userStore();
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = Axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 403) {
          console.error("دسترسی غیر مجاز"); // Custom error message in Persian
          // router.push('/admin2357/login'); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    return () => {
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, router]);

  return Axios; // Return the configured Axios instance
}



















//@ts-ignore