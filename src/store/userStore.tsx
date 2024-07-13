
import { Axios } from '@/lib/axios/axios';
import { deleteCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";

type User = {
    $id?: string;
    email?: string;
    displayName?: string;
    accessToken?: string | null;
    given_name?: string;
    exp?: string;
    role?: "Admin" | "User"
    // Add other properties as needed
};

type Store = {
    user: User
    setUser: (data: any) => void;
    setILoading: (data: any) => void,
    // register: (user: User) => void;
    // logout: () => void;
    isLoading: boolean
};

export const userStore = create<Store>((set) => ({
    user: { accessToken: null },
    isLoading: true,
    setUser: (data: any) => {

        const userData = {
            ...data,

        }
        set({ user: userData });
    },
    setILoading: (data) => { set({ isLoading: data }) }
    // cleanErrors: () => set(() => ({ errors: null })),
}));








