"use server"
import { redirect } from 'next/navigation'
import { TLoginForm } from "@/@core/components/Form/Login"
import { cookies } from 'next/headers'
import { requestHandler } from '@/lib/axios/requestHandler'
import { Axios } from '@/lib/axios/axios'

export async function LoginAction(data: TLoginForm) {
    try {
        const res = await Axios.post("/account/login", data)
        return res.data
    } catch (err) {


    }




}



export async function Refresh(refreshToken: string) {

    try {

        const req = await Axios.post("/auth/refresh", {
            refreshToken: refreshToken,
        });
        return req.data;
    }

    catch (err) {

    }
}


export async function getUser() {

    return await requestHandler((params) => AxiosPrivate.post("/account/authme"))()


}
export const fetchUser = async () => {
    const data = await requestHandler(() =>
        AxiosPrivate.post("/Account/authme")
    )();
    return data
};







