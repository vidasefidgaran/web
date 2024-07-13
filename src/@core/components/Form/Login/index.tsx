"use client"
import { z } from "zod";
import FormField from "../FormField";
import { useForm } from "react-hook-form"
import User from "/public/icons/user-cion.svg"
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/@core/components/Button/index";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { requestHandler } from "@/lib/axios/requestHandler";
import { Axios } from "@/lib/axios/axios";
const SignUpSchema = z.object({
    email: z.string().email("فرمت ایمیل نا معتبر است"),
    password: z.string()
})

export type TLoginForm = z.infer<typeof SignUpSchema>



const LoginForm = () => {
    const router = useRouter()
    const { user, setUser } = userStore()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<TLoginForm>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }

    }

    )

    const onSubmit = async (formData: TLoginForm) => {
        setIsLoading(true)
        const data = await requestHandler((formData) => Axios.post("/account/login", formData)
        )(formData).finally(() => {
            setIsLoading(false)
        })
        if (data.code == "success") {
            setIsLoading(false)
            setUser(data.data)
            toast.success("با موفقیت وارد شدید!");
            router.push("dashboard")

        } else if (data.code == "error") {
            toast.error("مشکلی پیش آمده");
            router.refresh
        }
    };

    return (
        <>
            <div className="flex flex-col gap-3 my-4">

                <FormField
                    icon={<User />}
                    id="email"
                    register={register}
                    type="text"
                    errors={errors}
                    label="ایمیل"
                    placeholder=""
                    required
                />




                <FormField
                    icon={<User />}
                    id="password"
                    register={register}
                    type="password"
                    errors={errors}
                    required
                    label="رمز عبور"
                    placeholder=""
                />


                <Button text="ورود" onClick={handleSubmit(onSubmit)} className="text-center py-3 text-lg items-center justify-center bg-primary-500 rounded-md" isLoading={isLoading} />

            </div>
        </>

    );
}

export default LoginForm;